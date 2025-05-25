import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { AuthButton, AuthInput } from '../components/common';
import { FormAuthLayout } from '../components/layout';

import { useLogIn } from '../hooks';

interface LoginFormData {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { isLoading, error, logInAction } = useLogIn();

  const onSubmit = async (data: LoginFormData) => {
    await logInAction(data);
    if (!error) {
      toast.success('Inicio de sesión exitoso');
    } else {
      toast.error(error);
    }
  };

  return (
    <FormAuthLayout
      title="Iniciar sesión"
      description="Ingresa tus credenciales para continuar"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 w-full">
          <AuthInput
            label="Email"
            type="email"
            id="email"
            placeholder="Ingresa tu email"
            required
            error={errors.email?.message}
            {...register('email', {
              required: 'Este campo es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ingresa un email válido',
              },
              maxLength: {
                value: 100,
                message: 'El email no debe tener más de 100 caracteres',
              },
              minLength: {
                value: 3,
                message: 'El email debe tener al menos 3 caracteres',
              },
              validate: {
                noSpaces: (value) =>
                  !/\s/.test(value) || 'El email no debe contener espacios',
              },
            })}
          />
          <AuthInput
            label="Contraseña"
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            required
            error={errors.password?.message}
            {...register('password', {
              required: 'Este campo es requerido',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
              maxLength: {
                value: 100,
                message: 'La contraseña no debe tener más de 100 caracteres',
              },
              validate: {
                noSpaces: (value) =>
                  !/\s/.test(value) ||
                  'La contraseña no debe contener espacios',
              },
            })}
          />
        </div>
        <div className="flex justify-end pt-2">
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:text-blue-700"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="pt-4">
          <AuthButton type="submit" disabled={isLoading}>
            <span>Iniciar sesión</span>
          </AuthButton>
        </div>
        {/* <div className="pt-4">
          <p className="text-sm text-gray-500">
            ¿No tienes una cuenta?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Regístrate
            </Link>
          </p>
        </div> */}
      </form>
    </FormAuthLayout>
  );
};
