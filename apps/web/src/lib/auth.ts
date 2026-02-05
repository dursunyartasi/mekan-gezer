// lib/auth.ts
// NextAuth v5 Configuration

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';
import type { UserRole } from '@prisma/client';
import { logger } from './logger';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            logger.warn('auth', 'Missing credentials', { email: credentials?.email });
            throw new Error('Email ve şifre gerekli');
          }

          logger.info('auth', 'Authorization attempt', { email: credentials.email });

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
            logger.warn('auth', 'User not found', { email: credentials.email });
            throw new Error('Kullanıcı bulunamadı');
          }

          // Check if banned
          if (user.isBanned) {
            logger.warn('auth', 'Banned user login attempt', { userId: user.id, email: user.email });
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
            logger.warn('auth', 'Invalid password', { email: credentials.email });
            throw new Error('Hatalı şifre');
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });

          logger.info('auth', 'User authorized successfully', { userId: user.id, email: user.email, role: user.role });

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
        } catch (error) {
          logger.error('auth', 'Authorization error', {
            email: credentials?.email,
            error: error instanceof Error ? error.message : String(error)
          }, error instanceof Error ? error : undefined);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
        (session.user as any).role = token.role;
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


