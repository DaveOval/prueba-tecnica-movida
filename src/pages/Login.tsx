import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthInput } from '../components/common';
import { FormAuthLayout } from '../components/layout';

interface LoginFormData {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <FormAuthLayout title="Iniciar sesión">
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <AuthInput
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            required
            {...register('email', { required: 'Este campo es requerido' })}
          />
        </div>
      </form>
    </FormAuthLayout>
  );
};
