import { supabase, Profile, CaregiverProfile, PatientProfile, Appointment } from './supabase';

// Profile API
export const profileApi = {
  // Get all users (admin only)
  getAllUsers: async (): Promise<Profile[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get user by ID
  getUser: async (id: string): Promise<Profile> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update user status (admin only)
  updateUserStatus: async (id: string, status: string): Promise<void> => {
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get users by role
  getUsersByRole: async (role: 'ADMIN' | 'CAREGIVER' | 'PATIENT'): Promise<Profile[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
};

// Caregiver Profile API
export const caregiverApi = {
  // Get caregiver profile
  getProfile: async (id: string): Promise<CaregiverProfile | null> => {
    const { data, error } = await supabase
      .from('caregiver_profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  },

  // Create/Update caregiver profile
  upsertProfile: async (profile: Partial<CaregiverProfile>): Promise<CaregiverProfile> => {
    const { data, error } = await supabase
      .from('caregiver_profiles')
      .upsert(profile)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all caregiver profiles
  getAllProfiles: async (): Promise<CaregiverProfile[]> => {
    const { data, error } = await supabase
      .from('caregiver_profiles')
      .select(`
        *,
        profiles!inner(*)
      `);
    
    if (error) throw error;
    return data;
  },

  // Verify caregiver
  verifyCaregiver: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('caregiver_profiles')
      .update({ is_verified: true })
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Patient Profile API
export const patientApi = {
  // Get patient profile
  getProfile: async (id: string): Promise<PatientProfile | null> => {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Create/Update patient profile
  upsertProfile: async (profile: Partial<PatientProfile>): Promise<PatientProfile> => {
    const { data, error } = await supabase
      .from('patient_profiles')
      .upsert(profile)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all patient profiles
  getAllProfiles: async (): Promise<PatientProfile[]> => {
    const { data, error } = await supabase
      .from('patient_profiles')
      .select(`
        *,
        profiles!inner(*)
      `);
    
    if (error) throw error;
    return data;
  },
};

// Appointments API
export const appointmentApi = {
  // Create appointment
  create: async (appointment: {
    patient_id: string;
    caregiver_id?: string;
    service_type: string;
    start_time: string;
    end_time: string;
    notes?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    hourly_rate?: number;
  }): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointment)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get appointments for user
  getUserAppointments: async (userId: string, role: 'CAREGIVER' | 'PATIENT'): Promise<Appointment[]> => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq(role === 'PATIENT' ? 'patient_id' : 'caregiver_id', userId)
      .order('start_time', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get all appointments (admin)
  getAll: async (): Promise<Appointment[]> => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('start_time', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Update appointment
  update: async (id: string, updates: Partial<Appointment>): Promise<Appointment> => {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete appointment
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Messages API
export const messageApi = {
  // Send message
  send: async (message: {
    receiver_id: string;
    appointment_id?: string;
    message: string;
  }): Promise<void> => {
    const { error } = await supabase
      .from('messages')
      .insert(message);
    
    if (error) throw error;
  },

  // Get conversation
  getConversation: async (userId1: string, userId2: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        profiles!messages_sender_id_fkey(first_name, last_name, avatar_url)
      `)
      .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Mark as read
  markAsRead: async (messageIds: string[]): Promise<void> => {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .in('id', messageIds);
    
    if (error) throw error;
  },
};

// Notifications API
export const notificationApi = {
  // Get user notifications
  getUserNotifications: async (userId: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create notification
  create: async (notification: {
    user_id: string;
    title: string;
    message: string;
    type: string;
  }): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .insert(notification);
    
    if (error) throw error;
  },

  // Mark as read
  markAsRead: async (notificationId: string): Promise<void> => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    
    if (error) throw error;
  },
};

// Reviews API
export const reviewApi = {
  // Create review
  create: async (review: {
    appointment_id: string;
    patient_id: string;
    caregiver_id: string;
    rating: number;
    comment?: string;
  }): Promise<void> => {
    const { error } = await supabase
      .from('reviews')
      .insert(review);
    
    if (error) throw error;
  },

  // Get caregiver reviews
  getCaregiverReviews: async (caregiverId: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviews_patient_id_fkey(first_name, last_name),
        appointments(service_type, start_time)
      `)
      .eq('caregiver_id', caregiverId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
};
