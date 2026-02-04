// lib/auth.ts
// NextAuth v5 Configuration

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';
import type { UserRole } from '@prisma/client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gerekli');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            email: true,
            username: true,
            passwordHash: true,
            role: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            isBanned: true,
            banUntil: true,
          },
        });

        if (!user) {
          throw new Error('Kullanıcı bulunamadı');
        }

        // Check if banned
        if (user.isBanned) {
          if (user.banUntil && user.banUntil > new Date()) {
            throw new Error('Hesabınız geçici olarak yasaklandı');
          } else if (!user.banUntil) {
            throw new Error('Hesabınız kalıcı olarak yasaklandı');
          }
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordValid) {
          throw new Error('Hatalı şifre');
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          name: user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}` 
            : user.username,
          image: user.avatarUrl,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
});

// Type augmentation for NextAuth
declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      role: UserRole;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    username: string;
    role: UserRole;
  }
}

