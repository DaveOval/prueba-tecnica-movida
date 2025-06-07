import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormLayout } from '../../components/layout/';
import {
  AuthInput,
  AuthButton,
  FormContainer,
  Input,
  InputSelect,
} from '../../components/common';
import { useNavigate } from 'react-router-dom';
import { useAddUser } from '../../hooks/auth/useAddUser';
import { AxiosError } from 'axios';

interface AddUserFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}

export const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AddUserFormData>();

  const { isLoading, addUserAction, error } = useAddUser();

  const onSubmit = async (data: AddUserFormData) => {
    try {
      await addUserAction(data);
      toast.success('Usuario agregado correctamente');
      reset();
      navigate('/configuracion');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al agregar el usuario';
      toast.error(errorMessage);
    }
  };

  return (
    <FormLayout title="Agregar usuario">
      <FormContainer title="Completa la información del usuario">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nombre completo"
              id="name"
              placeholder="Nombre completo del usuario"
              required
              type="text"
              error={errors.name?.message}
              {...register('name', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 100,
                  message: 'El nombre no puede exceder los 100 caracteres',
                },
                validate: (value) => {
                  const forbiddenPattern = /['";,]|--|\/\*|\*\//;
                  return (
                    !forbiddenPattern.test(value) ||
                    'El nombre contiene caracteres no permitidos'
                  );
                },
              })}
            />
            <Input
              label="Username"
              id="username"
              placeholder="Username del usuario"
              required
              type="text"
              error={errors.username?.message}
              {...register('username', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'El username debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 100,
                  message: 'El username no puede exceder los 100 caracteres',
                },
                validate: (value) => {
                  const forbiddenPattern = /['";,]|--|\/\*|\*\//;
                  return (
                    !forbiddenPattern.test(value) ||
                    'El username contiene caracteres no permitidos'
                  );
                },
              })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Email"
              id="email"
              placeholder="Email del usuario"
              required
              type="email"
              error={errors.email?.message}
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'El email no es válido',
                },
                maxLength: {
                  value: 100,
                  message: 'El email no puede exceder los 100 caracteres',
                },
              })}
            />
            <InputSelect
              label="Rol"
              id="role"
              placeholder="Rol del usuario"
              required
              options={[
                { label: 'Usuario', value: 'user' },
                { label: 'Administrador', value: 'admin' },
              ]}
              error={errors.role?.message}
              {...register('role', { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AuthInput
              label="Contraseña"
              type="password"
              id="password"
              placeholder="Contraseña del usuario"
              required
              error={errors.password?.message}
              {...register('password', {
                required: true,
                validate: {
                  minLength: (v) =>
                    v.length >= 8 ||
                    'La contraseña debe tener al menos 8 caracteres',
                  maxLength: (v) =>
                    v.length <= 100 ||
                    'La contraseña no puede exceder los 100 caracteres',
                  hasUppercase: (v) =>
                    /[A-Z]/.test(v) ||
                    'La contraseña debe tener al menos una letra mayúscula',
                  hasLowercase: (v) =>
                    /[a-z]/.test(v) ||
                    'La contraseña debe tener al menos una letra minúscula',
                  hasNumber: (v) =>
                    /\d/.test(v) ||
                    'La contraseña debe tener al menos un número',
                  hasSpecialChar: (v) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                    'La contraseña debe tener al menos un carácter especial',
                  noSpaces: (v) =>
                    !/\s/.test(v) || 'La contraseña no debe contener espacios',
                },
              })}
            />
            <AuthInput
              label="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              placeholder="Confirmar contraseña del usuario"
              required
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: true,
                validate: (value) => {
                  return (
                    value === watch('password') ||
                    'Las contraseñas no coinciden'
                  );
                },
              })}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="pt-10 flex justify-center">
            <AuthButton
              type="submit"
              className="w-full md:w-1/3"
              disabled={isLoading}
            >
              <span>Agregar usuario</span>
            </AuthButton>
          </div>
        </form>
      </FormContainer>
    </FormLayout>
  );
};
