import { api } from '../api';

interface LoginFormData {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}

interface SignUpFormData {
  email: string;
  password: string;
  name: string;
}

const AUTH_ENDPOINT = 'auth';

export const logIn = async (data: LoginFormData) => {
  if (!data.email || !data.password) {
    throw new Error('Email and password are required');
  }

  const response = await api.post(`${AUTH_ENDPOINT}/login`, data);
  return response.data;
};

export const sigIn = async (data: SignUpFormData) => {
  if (!data.email || !data.password || !data.name) {
    throw new Error('Email, password and name are required');
  }

  const response = await api.post(`${AUTH_ENDPOINT}/signup`, data);
  return response.data;
};
