import { create } from 'zustand';
import * as yup from 'yup';
import { useErrorStore } from './errorStore';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormState {
  formData: FormData;
  isSubmitting: boolean;
  updateField: (field: keyof FormData, value: string) => void;
  validateField: (field: keyof FormData) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

const formSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format')
    .max(255, 'Email must not exceed 255 characters'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
});

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export const useFormStore = create<FormState>((set, get) => ({
  formData: initialFormData,
  isSubmitting: false,
  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  validateField: async (field) => {
    try {
      await yup.reach(formSchema, field).validate(get().formData[field]);
      useErrorStore.getState().clearError(field);
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        useErrorStore.getState().setError(field, error.message);
      }
      return false;
    }
  },
  validateForm: async () => {
    try {
      await formSchema.validate(get().formData, { abortEarly: false });
      useErrorStore.getState().clearAllErrors();
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            useErrorStore.getState().setError(err.path, err.message);
          }
        });
      }
      return false;
    }
  },
  submitForm: async () => {
    set({ isSubmitting: true });
    try {
      const isValid = await get().validateForm();
      if (!isValid) {
        throw new Error('Form validation failed');
      }
      
      // Simulated API call with security measures
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form on success
      get().resetForm();
      toast.success('Form submitted successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      set({ isSubmitting: false });
    }
  },
  resetForm: () => {
    set({ formData: initialFormData });
    useErrorStore.getState().clearAllErrors();
  },
}));