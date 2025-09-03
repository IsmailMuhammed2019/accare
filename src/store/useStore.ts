import { create } from 'zustand'

interface ContactForm {
  name: string
  phone: string
  email: string
  message: string
}

interface UIState {
  isMenuOpen: boolean
  isContactModalOpen: boolean
}

interface Store {
  contactForm: ContactForm
  ui: UIState
  setContactForm: (form: Partial<ContactForm>) => void
  resetContactForm: () => void
  setMenuOpen: (open: boolean) => void
  setContactModalOpen: (open: boolean) => void
}

const initialContactForm: ContactForm = {
  name: '',
  phone: '',
  email: '',
  message: ''
}

export const useStore = create<Store>((set) => ({
  contactForm: initialContactForm,
  ui: {
    isMenuOpen: false,
    isContactModalOpen: false
  },
  setContactForm: (form) =>
    set((state) => ({
      contactForm: { ...state.contactForm, ...form }
    })),
  resetContactForm: () =>
    set({ contactForm: initialContactForm }),
  setMenuOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, isMenuOpen: open }
    })),
  setContactModalOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, isContactModalOpen: open }
    }))
}))
