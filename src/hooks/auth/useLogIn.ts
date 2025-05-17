import { useCallback, useState } from 'react';
import { logIn } from '../../services';

interface LogInData {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}

export const useLogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logInAction = useCallback(
    async (data: LogInData): Promise<void> => {
      if (!data.email || !data.password) {
        setError('Email and password are required');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await logIn(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError]
  );

  return {
    isLoading,
    error,
    logInAction,
  };
};
