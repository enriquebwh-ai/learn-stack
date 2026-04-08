import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier: 'free' | 'pro' | 'admin';
  subscription_status: 'inactive' | 'active' | 'cancelled';
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  is_premium: boolean;
  order_index: number;
  created_at: string;
};

export type Lesson = {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  content: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  order_index: number;
  is_premium: boolean;
  created_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
};
