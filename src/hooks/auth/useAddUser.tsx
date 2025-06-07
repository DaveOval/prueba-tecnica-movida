import { useCallback, useState } from 'react';
import { addUser } from '../../services/auth/addUserService';
import { AxiosError } from 'axios';

interface AddUserFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export const useAddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addUserAction = useCallback(async (data: AddUserFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await addUser(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al agregar el producto';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    addUserAction,
  };
};
