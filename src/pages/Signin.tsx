import { useForm } from 'react-hook-form';

// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';

import { AuthButton, AuthCheckBox, AuthInput } from '../components/common';
import { FormAuthLayout } from '../components/layout';
import { Link } from 'react-router-dom';

interface SigninFormData {
  name: string;
  secondName: string;
  email: string;
  password: string;
  terms: boolean;
  confirmPassword: string;
}

export const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SigninFormData>();

  const onSubmit = (data: SigninFormData) => {
    console.log(data);
  };

  return (
    <FormAuthLayout
      title="Crear cuenta"
      description="Ingresa tus credenciales para continuar!"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInput
              label="Nombre"
              type="text"
              id="name"
              placeholder="Ingresa tu nombre"
              required
              error={errors.name?.message}
              {...register('name', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
              })}
            />
            <AuthInput
              label="Segundo nombre"
              type="text"
              id="secondName"
              placeholder="Segundo nombre"
              required
              error={errors.secondName?.message}
              {...register('secondName', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'El segundo nombre debe tener al menos 3 caracteres',
                },
              })}
            />
          </div>
          <div className="gap-4 flex flex-col mb-5">
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
                  format: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    ) ||
                    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
                  noSpaces: (value) =>
                    !/\s/.test(value) ||
                    'La contraseña no debe contener espacios',
                },
              })}
            />
            <AuthInput
              label="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              required
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Este campo es requerido',
                validate: (value) => {
                  if (value !== getValues('password')) {
                    return 'Las contraseñas no coinciden';
                  }
                  return true;
                },
              })}
            />
          </div>
        </div>
        <div className="pt-4">
          <AuthCheckBox
            label="Acepto los términos y condiciones"
            id="terms"
            required
            error={errors.terms?.message}
            {...register('terms', {
              required: 'Este campo es requerido',
            })}
          />
        </div>
        <div className="pt-4">
          <AuthButton type="submit">
            <span>Crear cuenta</span>
          </AuthButton>
        </div>
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </FormAuthLayout>
  );
};
