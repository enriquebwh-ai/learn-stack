import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-white font-bold text-xl">Learn Stack</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#herramientas" className="text-zinc-300 hover:text-white transition">Herramientas</a>
          <a href="#proyectos" className="text-zinc-300 hover:text-white transition">Proyectos</a>
          <a href="#precios" className="text-zinc-300 hover:text-white transition">Precios</a>
        </nav>
        <button className="bg-white text-slate-900 px-5 py-2 rounded-full font-semibold hover:bg-zinc-100 transition">
          Comenzar
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-purple-200 text-sm">Nuevo: Curso completo de Middleware</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight">
          Domina las herramientas del
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> desarrollo moderno</span>
        </h1>

        <p className="text-xl text-zinc-400 mb-12 max-w-2xl">
          Aprende Vercel, Supabase, Stripe, Figma y más en un solo lugar. 
          Proyectos prácticos guiados paso a paso.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition">
            Empezar Gratis
          </button>
          <button className="border border-zinc-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-zinc-800 transition">
            Ver Demo
          </button>
        </div>

        <div className="flex gap-8 flex-wrap justify-center opacity-60">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Vercel</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Supabase</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Stripe</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Figma</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>Next.js</span>
          </div>
        </div>
      </main>

      <section id="herramientas" className="px-8 py-24 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">Herramientas que aprenderás</h2>
          <p className="text-zinc-400 text-center mb-16 max-w-2xl mx-auto">
            Todo lo que necesitas para construir aplicaciones web completas y profesional
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">▲</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Vercel</h3>
              <p className="text-zinc-400">Despliega tu aplicación en segundos con deploy automático desde GitHub y CDN global.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-green-500/50 transition">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">◉</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Supabase</h3>
              <p className="text-zinc-400">Base de datos PostgreSQL, autenticación, almacenamiento y APIs REST/GraphQL listas para usar.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⇄</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Stripe</h3>
              <p className="text-zinc-400">Acepta pagos con tarjeta, suscripciones, facturas y todo lo relacionado con monetización.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-orange-500/50 transition">
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">◎</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Figma</h3>
              <p className="text-zinc-400">Diseño UI/UX profesional. Crea prototipos, sistemas de diseño y colaboración en tiempo real.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-yellow-500/50 transition">
              <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Middleware</h3>
              <p className="text-zinc-400">Código que se ejecuta entre peticiones. Autenticación, logging, rate limiting y más.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⬡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Next.js</h3>
              <p className="text-zinc-400">El framework de React más potente. SSR, SSG, API routes y rendering híbrido.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="precios" className="px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Planes simples</h2>
          <p className="text-zinc-400 mb-12">Elige el plan que mejor se adapte a tus necesidades</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Gratis</h3>
              <div className="text-5xl font-bold text-white mb-6">$0<span className="text-lg text-zinc-400">/mes</span></div>
              <ul className="text-zinc-400 text-left space-y-3 mb-8">
                <li>✓ 5 proyectos</li>
                <li>✓ Tutoriales básicos</li>
                <li>✓ Comunidad Discord</li>
              </ul>
              <button className="w-full border border-purple-500 text-purple-400 py-3 rounded-full font-semibold hover:bg-purple-500/10 transition">
                Empezar gratis
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 border border-purple-400 rounded-2xl p-8">
              <div className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-4">Popular</div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-5xl font-bold text-white mb-6">$29<span className="text-lg text-white/70">/mes</span></div>
              <ul className="text-white/90 text-left space-y-3 mb-8">
                <li>✓ Proyectos ilimitados</li>
                <li>✓ Todos los cursos</li>
                <li>✓ Certificados</li>
                <li>✓ Soporte prioritario</li>
                <li>✓ Middleware avanzado</li>
              </ul>
              <button className="w-full bg-white text-purple-600 py-3 rounded-full font-semibold hover:bg-zinc-100 transition">
                Obtener Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-8 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-zinc-400">© 2026 Learn Stack. Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-6 text-zinc-400">
            <a href="#" className="hover:text-white transition">Términos</a>
            <a href="#" className="hover:text-white transition">Privacidad</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}