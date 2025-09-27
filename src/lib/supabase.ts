import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone: string | null
          avatar_url: string | null
          role: 'ADMIN' | 'CAREGIVER' | 'PATIENT'
          status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'ADMIN' | 'CAREGIVER' | 'PATIENT'
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'ADMIN' | 'CAREGIVER' | 'PATIENT'
          status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION'
          created_at?: string
          updated_at?: string
        }
      }
      caregiver_profiles: {
        Row: {
          id: string
          license_number: string | null
          specializations: string[] | null
          experience_years: number
          hourly_rate: number
          bio: string | null
          languages: string[] | null
          availability: any | null
          background_check: boolean
          cpr_certified: boolean
          first_aid_certified: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          license_number?: string | null
          specializations?: string[] | null
          experience_years?: number
          hourly_rate?: number
          bio?: string | null
          languages?: string[] | null
          availability?: any | null
          background_check?: boolean
          cpr_certified?: boolean
          first_aid_certified?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          license_number?: string | null
          specializations?: string[] | null
          experience_years?: number
          hourly_rate?: number
          bio?: string | null
          languages?: string[] | null
          availability?: any | null
          background_check?: boolean
          cpr_certified?: boolean
          first_aid_certified?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      patient_profiles: {
        Row: {
          id: string
          date_of_birth: string | null
          gender: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          medical_history: string | null
          allergies: string | null
          current_medications: string | null
          mobility_level: string | null
          care_needs: string[] | null
          insurance_info: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          medical_history?: string | null
          allergies?: string | null
          current_medications?: string | null
          mobility_level?: string | null
          care_needs?: string[] | null
          insurance_info?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          medical_history?: string | null
          allergies?: string | null
          current_medications?: string | null
          mobility_level?: string | null
          care_needs?: string[] | null
          insurance_info?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          caregiver_id: string | null
          service_type: 'PERSONAL_CARE' | 'COMPANIONSHIP' | 'MEDICATION_MANAGEMENT' | 'MEAL_PREPARATION' | 'LIGHT_HOUSEKEEPING' | 'MOBILITY_SUPPORT'
          start_time: string
          end_time: string
          status: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          notes: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          hourly_rate: number | null
          total_cost: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          caregiver_id?: string | null
          service_type: 'PERSONAL_CARE' | 'COMPANIONSHIP' | 'MEDICATION_MANAGEMENT' | 'MEAL_PREPARATION' | 'LIGHT_HOUSEKEEPING' | 'MOBILITY_SUPPORT'
          start_time: string
          end_time: string
          status?: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          notes?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          hourly_rate?: number | null
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          caregiver_id?: string | null
          service_type?: 'PERSONAL_CARE' | 'COMPANIONSHIP' | 'MEDICATION_MANAGEMENT' | 'MEAL_PREPARATION' | 'LIGHT_HOUSEKEEPING' | 'MOBILITY_SUPPORT'
          start_time?: string
          end_time?: string
          status?: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          notes?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          hourly_rate?: number | null
          total_cost?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type CaregiverProfile = Database['public']['Tables']['caregiver_profiles']['Row']
export type PatientProfile = Database['public']['Tables']['patient_profiles']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
