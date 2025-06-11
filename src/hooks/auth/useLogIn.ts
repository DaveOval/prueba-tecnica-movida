import { useCallback, useState } from 'react';
import { logIn } from '../../services';
import { login } from '../../store/slices/authSlice';
import { useAppDispatch } from '../useAppDispatch';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface LogInData {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}

export const useLogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logInAction = useCallback(
    async (data: LogInData): Promise<void> => {
      if (!data.email || !data.password) {
        toast.error('Email y contraseña son requeridos');
        return;
      }

      setIsLoading(true);

      try {
        const response = await logIn(data);

        if (response?.user) {
          dispatch(login(response.user));
          toast.success('Inicio de sesión exitoso');
          navigate('/');
        } else {
          toast.error('No se recibió información del usuario');
        }
      } catch (e) {
        console.log('Error :', e);
        toast.error('Credenciales incorrectas');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, navigate]
  );

  return {
    isLoading,
    logInAction,
  };
};
