-- A&C Care Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Note: Supabase automatically handles JWT configuration

-- Create custom types
CREATE TYPE user_role AS ENUM ('ADMIN', 'CAREGIVER', 'PATIENT');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION');
CREATE TYPE appointment_status AS ENUM ('PENDING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE service_type AS ENUM (
  'PERSONAL_CARE',
  'COMPANIONSHIP', 
  'MEDICATION_MANAGEMENT',
  'MEAL_PREPARATION',
  'LIGHT_HOUSEKEEPING',
  'MOBILITY_SUPPORT'
);

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'PATIENT',
  status user_status NOT NULL DEFAULT 'PENDING_VERIFICATION',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Caregiver profiles
CREATE TABLE public.caregiver_profiles (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  license_number VARCHAR(50),
  specializations TEXT[],
  experience_years INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2) DEFAULT 0.00,
  bio TEXT,
  languages TEXT[],
  availability JSONB,
  background_check BOOLEAN DEFAULT FALSE,
  cpr_certified BOOLEAN DEFAULT FALSE,
  first_aid_certified BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patient profiles
CREATE TABLE public.patient_profiles (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  date_of_birth DATE,
  gender VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  medical_history TEXT,
  allergies TEXT,
  current_medications TEXT,
  mobility_level VARCHAR(50),
  care_needs TEXT[],
  insurance_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  caregiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_type service_type NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status appointment_status DEFAULT 'PENDING',
  notes TEXT,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  hourly_rate DECIMAL(10,2),
  total_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews/Ratings
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  caregiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages/Chat
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security Policies

-- Profiles policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow admins to view all profiles (using auth.jwt() to check role)
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    COALESCE(
      (auth.jwt() ->> 'user_metadata' ->> 'role')::text,
      (auth.jwt() ->> 'app_metadata' ->> 'role')::text
    ) = 'ADMIN'
  );

-- Allow admins to manage all profiles
CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (
    COALESCE(
      (auth.jwt() ->> 'user_metadata' ->> 'role')::text,
      (auth.jwt() ->> 'app_metadata' ->> 'role')::text
    ) = 'ADMIN'
  );

-- Caregiver profiles policies
ALTER TABLE public.caregiver_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Caregivers can manage own profile" ON public.caregiver_profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Patients can view caregiver profiles" ON public.caregiver_profiles
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage all caregiver profiles" ON public.caregiver_profiles
  FOR ALL USING (
    COALESCE(
      (auth.jwt() ->> 'user_metadata' ->> 'role')::text,
      (auth.jwt() ->> 'app_metadata' ->> 'role')::text
    ) = 'ADMIN'
  );

-- Patient profiles policies
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients can manage own profile" ON public.patient_profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Caregivers can view assigned patient profiles" ON public.patient_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE patient_id = id AND caregiver_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all patient profiles" ON public.patient_profiles
  FOR ALL USING (
    COALESCE(
      (auth.jwt() ->> 'user_metadata' ->> 'role')::text,
      (auth.jwt() ->> 'app_metadata' ->> 'role')::text
    ) = 'ADMIN'
  );

-- Appointments policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own appointments" ON public.appointments
  FOR SELECT USING (patient_id = auth.uid() OR caregiver_id = auth.uid());

CREATE POLICY "Patients can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Caregivers can update assigned appointments" ON public.appointments
  FOR UPDATE USING (caregiver_id = auth.uid());

CREATE POLICY "Admins can manage all appointments" ON public.appointments
  FOR ALL USING (
    COALESCE(
      (auth.jwt() ->> 'user_metadata' ->> 'role')::text,
      (auth.jwt() ->> 'app_metadata' ->> 'role')::text
    ) = 'ADMIN'
  );

-- Reviews policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews" ON public.reviews
  FOR SELECT USING (patient_id = auth.uid() OR caregiver_id = auth.uid());

CREATE POLICY "Patients can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (patient_id = auth.uid());

-- Messages policies
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Notifications policies
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Functions

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_caregiver_profiles_updated_at BEFORE UPDATE ON public.caregiver_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_patient_profiles_updated_at BEFORE UPDATE ON public.patient_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin user (you'll need to create this user in Supabase Auth first)
-- This is just a placeholder - you'll create the actual admin user through Supabase Auth
-- INSERT INTO public.profiles (id, email, first_name, last_name, role, status)
-- VALUES ('admin-uuid-here', 'admin@accare.com', 'Admin', 'User', 'ADMIN', 'ACTIVE');

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_status ON public.profiles(status);
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_caregiver_id ON public.appointments(caregiver_id);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
