'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName);
        setError('Revisa tu email para confirmar tu cuenta');
        setLoading(false);
        return;
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <span className="text-white font-bold text-2xl">Learn Stack</span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h1>
          <p className="text-zinc-400 mt-2">
            {isLogin 
              ? 'Ingresa tus datos para continuar' 
              : 'Empieza a aprender hoy mismo'}
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-zinc-300 text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                  placeholder="Tu nombre"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading 
                ? 'Cargando...' 
                : isLogin 
                  ? 'Iniciar sesión' 
                  : 'Crear cuenta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-zinc-400 hover:text-white transition text-sm"
            >
              {isLogin 
                ? '¿No tienes cuenta? Regístrate gratis' 
                : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <a href="/" className="text-zinc-500 hover:text-zinc-300 transition text-sm">
                ← Volver al inicio
              </a>
            </div>
          )}
        </div>

        {isLogin && (
          <p className="text-center text-zinc-500 text-sm mt-6">
            ¿No tienes cuenta? <span className="text-purple-400">Prueba gratis</span> con 3 cursos incluidos
          </p>
        )}
      </div>
    </div>
  );
}
