import { useForm } from 'react-hook-form';

// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';

import { AuthButton, AuthCheckBox, AuthInput } from '../components/common';
import { FormAuthLayout } from '../components/layout';
import { Link } from 'react-router-dom';

interface SigninFormData {
  email: string;
  password: string;
  name: string;
  secondName: string;
}

export const Signin = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  return (
    <FormAuthLayout
      title="Crear cuenta"
      description="Ingresa tus credenciales para continuar!"
    >
      <form>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInput
              label="Nombre"
              type="text"
              id="name"
              placeholder="Nombre"
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
          <div>
            <AuthInput
              label="Email"
              type="email"
              id="email"
              placeholder="Email"
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
          </div>
        </div>
        <div className="pt-4">
          <AuthCheckBox
            label="Acepto los términos y condiciones"
            id="terms"
            required
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
