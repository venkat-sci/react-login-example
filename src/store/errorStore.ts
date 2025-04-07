import { create } from 'zustand';

interface ErrorState {
  errors: Record<string, string>;
  setError: (key: string, message: string) => void;
  clearError: (key: string) => void;
  clearAllErrors: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errors: {},
  setError: (key, message) =>
    set((state) => ({
      errors: { ...state.errors, [key]: message },
    })),
  clearError: (key) =>
    set((state) => {
      const { [key]: _, ...rest } = state.errors;
      return { errors: rest };
    }),
  clearAllErrors: () => set({ errors: {} }),
}));