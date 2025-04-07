import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials, AuthResponse, User } from '../types/auth';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data.data;
};

export const fetchUserDetails = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};