-- Fix RLS Policies - Run this in Supabase SQL Editor
-- This will drop existing policies and recreate them without circular references

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Recreate profiles policies with simpler approach
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow all authenticated users to view profiles (for now)
CREATE POLICY "Authenticated users can view profiles" ON public.profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Drop and recreate caregiver profile policies
DROP POLICY IF EXISTS "Caregivers can manage own profile" ON public.caregiver_profiles;
DROP POLICY IF EXISTS "Patients can view caregiver profiles" ON public.caregiver_profiles;
DROP POLICY IF EXISTS "Admins can manage all caregiver profiles" ON public.caregiver_profiles;

CREATE POLICY "Caregivers can manage own profile" ON public.caregiver_profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Patients can view caregiver profiles" ON public.caregiver_profiles
  FOR SELECT USING (true);

-- Drop and recreate patient profile policies
DROP POLICY IF EXISTS "Patients can manage own profile" ON public.patient_profiles;
DROP POLICY IF EXISTS "Caregivers can view assigned patient profiles" ON public.patient_profiles;
DROP POLICY IF EXISTS "Admins can manage all patient profiles" ON public.patient_profiles;

CREATE POLICY "Patients can manage own profile" ON public.patient_profiles
  FOR ALL USING (auth.uid() = id);

-- Drop and recreate appointment policies
DROP POLICY IF EXISTS "Users can view own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Patients can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Caregivers can update assigned appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.appointments;

CREATE POLICY "Users can view own appointments" ON public.appointments
  FOR SELECT USING (patient_id = auth.uid() OR caregiver_id = auth.uid());

CREATE POLICY "Patients can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Caregivers can update assigned appointments" ON public.appointments
  FOR UPDATE USING (caregiver_id = auth.uid());

-- Drop and recreate other policies
DROP POLICY IF EXISTS "Users can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Patients can create reviews" ON public.reviews;

CREATE POLICY "Users can view reviews" ON public.reviews
  FOR SELECT USING (patient_id = auth.uid() OR caregiver_id = auth.uid());

CREATE POLICY "Patients can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (patient_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;

CREATE POLICY "Users can view own messages" ON public.messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;

CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());
