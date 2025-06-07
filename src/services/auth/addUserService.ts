import { api } from '../api';

interface AddUserFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const USERS_ENDPOINT = 'auth';

export const addUser = async (data: AddUserFormData) => {
  if (!data) {
    throw new Error('All fields are required');
  }

  const response = await api.post(`${USERS_ENDPOINT}/register`, data);
  return response.data;
};
