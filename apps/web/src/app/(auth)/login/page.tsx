// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Log login attempt
      await fetch('/api/log-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: 'info',
          category: 'auth',
          message: 'Login attempt',
          details: { email },
        }),
      });

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        // Log login error
        await fetch('/api/log-client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level: 'error',
            category: 'auth',
            message: 'Login failed',
            details: { email, error: result.error },
          }),
        });
      } else if (result?.ok) {
        // Log successful login
        await fetch('/api/log-client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            level: 'info',
            category: 'auth',
            message: 'Login successful',
            details: { email },
          }),
        });
        // Redirect to admin panel
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu');
      // Log exception
      await fetch('/api/log-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: 'error',
          category: 'auth',
          message: 'Login exception',
          details: { email, error: err instanceof Error ? err.message : String(err) },
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Compass className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Mekan Gezer</h1>
          </Link>
          <p className="text-gray-600">Hesabınıza giriş yapın</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Hesabınız yok mu?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Kayıt Ol
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
