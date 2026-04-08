-- =============================================
-- LEARN STACK - Base de Datos
-- =============================================

-- Tabla de perfiles de usuario (extiende auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro')),
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('inactive', 'active', 'cancelled')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de cursos
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de lecciones
CREATE TABLE lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, slug)
);

-- Tabla de progreso del usuario
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- =============================================
-- SEGURIDAD (Row Level Security)
-- =============================================

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policies para cursos (públicos para ver)
CREATE POLICY "Anyone can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Only admins can modify courses" ON courses FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND subscription_tier = 'admin')
);

-- Policies para lecciones
CREATE POLICY "Anyone can view lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Only admins can modify lessons" ON lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND subscription_tier = 'admin')
);

-- Policies para progreso (solo el usuario ve el suyo)
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- FUNCIONES Y TRIGGERS
-- =============================================

-- Función para crear perfil automáticamente cuando un usuario se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil al registrarse
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- DATOS DE EJEMPLO
-- =============================================

-- Insertar curso de ejemplo
INSERT INTO courses (title, slug, description, is_premium, order_index) VALUES
('Primeros Pasos con Vercel', 'vercel-basico', 'Aprende a desplegar tu primera aplicación web con Vercel en minutos.', false, 1),
('Introducción a Supabase', 'supabase-basico', 'Base de datos, autenticación y más - todo gratis.', true, 2),
('Acepta Pagos con Stripe', 'stripe-pagos', 'Configura Stripe y acepta pagos en tu web.', true, 3);

-- Insertar lecciones de ejemplo
INSERT INTO lessons (course_id, title, slug, content, duration_minutes, is_premium, order_index)
SELECT 
  c.id,
  '¿Qué es Vercel?',
  'que-es-vercel',
  E'# ¿Qué es Vercel?\n\nVercel es una plataforma de **despliegue en la nube** que te permite:\n\n- **Publicar tu web** en segundos\n- **Conectar con GitHub** para deploy automático\n- **Dominio gratis** (tu-proyecto.vercel.app)\n- **SSL incluido** (HTTPS)\n\n## ¿Por qué usar Vercel?\n\n1. **Gratis** para proyectos pequeños\n2. **Ultra rápido** (CDN global)\n3. **Fácil** - solo empujar código a GitHub\n\n## Cómo funciona\n\n1. Creas tu código en tu computadora\n2. Subes a GitHub\n3. Vercel detecta automáticamente Next.js, React, etc.\n4. ¡ PUBLICA ! 🚀\n\nEn la siguiente lección verás cómo desplegar tu primera web.',
  10,
  false,
  1
FROM courses c WHERE c.slug = 'vercel-basico';

INSERT INTO lessons (course_id, title, slug, content, duration_minutes, is_premium, order_index)
SELECT 
  c.id,
  'Despliega tu primera web',
  'despliega-tu-primera-web',
  E'# Despliega tu primera web\n\n## Paso 1: Preparar tu proyecto\n\nAsegúrate de tener:\n- Un proyecto en GitHub\n- package.json con scripts\n\n## Paso 2: Conectar a Vercel\n\n1. Ve a vercel.com\n2. Click en "New Project"\n3. Importa tu repositorio de GitHub\n4. Vercel detecta el framework automáticamente\n\n## Paso 3: Desplegar\n\n1. Click en "Deploy"\n2. Espera 1-2 minutos\n3. ¡Listo! Tu web está en vivo 🌍\n\n## Dominio personalizado\n\nEn Settings > Domains puedes cambiar:\n- `tu-proyecto.vercel.app` → `tudominio.com`\n\n## Próximos pasos\n\n- Configurar variables de entorno\n- Añadir dominio personalizado\n- Configurar builds automáticas',
  15,
  false,
  2
FROM courses c WHERE c.slug = 'vercel-basico';
