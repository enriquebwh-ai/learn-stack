'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase, Course, Profile } from '@/lib/supabase';

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchCourses() {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .order('order_index');
      if (data) setCourses(data);
      setLoadingCourses(false);
    }
    if (user) fetchCourses();
  }, [user]);

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800/50 border-b border-slate-700 px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-white font-bold text-xl">Learn Stack</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">{user.email}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              profile?.subscription_tier === 'pro' 
                ? 'bg-purple-500/20 text-purple-400' 
                : 'bg-zinc-500/20 text-zinc-400'
            }`}>
              {profile?.subscription_tier === 'pro' ? 'PRO' : 'GRATIS'}
            </span>
            <button
              onClick={handleSignOut}
              className="text-zinc-400 hover:text-white transition text-sm"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            ¡Hola, {profile?.full_name || 'Estudiante'}! 👋
          </h1>
          <p className="text-zinc-400">
            Continúa aprendiendo. Tu progreso se guarda automáticamente.
          </p>
        </div>

        {profile?.subscription_tier !== 'pro' && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  🏆 Desbloquea todo el contenido
                </h3>
                <p className="text-white/80">
                  Accede a todos los cursos, proyectos y certificados por solo <strong>3€/mes</strong>
                </p>
              </div>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-zinc-100 transition">
                Mejorar a PRO
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Tus cursos</h2>
        </div>

        {loadingCourses ? (
          <div className="text-zinc-400">Cargando cursos...</div>
        ) : courses.length === 0 ? (
          <div className="text-zinc-400">No hay cursos disponibles</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <span className="text-6xl">
                    {course.slug === 'vercel-basico' && '▲'}
                    {course.slug === 'supabase-basico' && '◉'}
                    {course.slug === 'stripe-pagos' && '⇄'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {course.is_premium && (
                      <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full">
                        PRO
                      </span>
                    )}
                    {!course.is_premium && (
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        GRATIS
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{course.description}</p>
                  <button className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition text-sm font-medium">
                    {course.is_premium && profile?.subscription_tier !== 'pro' 
                      ? 'Disponible en PRO'
                      : 'Ir al curso →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 pt-12 border-t border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">Tu progreso</h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <p className="text-zinc-400">
              Aún no has started ningún curso. ¡Empieza hoy y lleva tu aprendizaje al siguiente nivel!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
