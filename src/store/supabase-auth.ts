import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, Profile } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface AuthUser extends Profile {
  // Additional user properties if needed
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'CAREGIVER' | 'PATIENT';
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            // Fetch user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            if (profileError) throw profileError;

            set({
              user: profile,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
              data: {
                first_name: userData.firstName,
                last_name: userData.lastName,
                phone: userData.phone,
                role: userData.role,
              },
            },
          });

          if (error) throw error;

          if (data.user) {
            // The profile will be automatically created by the trigger
            // But we need to update it with the role
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                role: userData.role,
                phone: userData.phone,
              })
              .eq('id', data.user.id);

            if (updateError) throw updateError;

            // Fetch the complete profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            if (profileError) throw profileError;

            set({
              user: profile,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut();
          set({
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      updateProfile: async (data: Partial<AuthUser>) => {
        const { user } = get();
        if (!user) return;

        try {
          const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id);

          if (error) throw error;

          // Update local state
          set({
            user: { ...user, ...data },
          });
        } catch (error) {
          throw error;
        }
      },

      refreshUser: async () => {
        try {
          const { data: { user: authUser } } = await supabase.auth.getUser();
          
          if (authUser) {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.id)
              .single();

            if (!error && profile) {
              set({
                user: profile,
                isAuthenticated: true,
              });
            }
          } else {
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          console.error('Refresh user error:', error);
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Initialize auth state on app start
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      useAuthStore.getState().refreshUser();
    } else if (event === 'SIGNED_OUT') {
      useAuthStore.getState().logout();
    }
  });
}
