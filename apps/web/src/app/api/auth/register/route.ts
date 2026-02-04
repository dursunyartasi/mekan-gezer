// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { grupoAPI } from '@/lib/grupo/api';
import { slugify } from '@/lib/utils';

const registerSchema = z.object({
  email: z.string().email('Geçerli bir email adresi girin'),
  username: z.string().min(3, 'Kullanıcı adı en az 3 karakter olmalı').max(50),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === validatedData.email) {
        return NextResponse.json(
          { error: 'Bu email adresi zaten kullanımda' },
          { status: 400 }
        );
      }
      if (existingUser.username === validatedData.username) {
        return NextResponse.json(
          { error: 'Bu kullanıcı adı zaten alınmış' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    // Create user in Mekan Gezer database
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });

    // Create user in Grupo Pro
    try {
      const grupoResult = await grupoAPI.createUser({
        username: validatedData.username,
        email: validatedData.email,
        password: validatedData.password,
        full_name: validatedData.firstName && validatedData.lastName
          ? `${validatedData.firstName} ${validatedData.lastName}`
          : validatedData.username,
      });

      if (grupoResult.success && grupoResult.user_id) {
        // Update user with Grupo Pro ID
        await prisma.user.update({
          where: { id: user.id },
          data: { grupoUserId: grupoResult.user_id },
        });
      }
    } catch (grupoError) {
      console.error('Grupo Pro user creation failed:', grupoError);
      // Don't fail registration if Grupo fails
      // User can still use the platform without chat
    }

    return NextResponse.json(
      {
        message: 'Kayıt başarılı! Giriş yapabilirsiniz.',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Kayıt sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
