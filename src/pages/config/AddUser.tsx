import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FormLayout } from '../../components/layout/';
import { FormContainer, InputSelect } from '../../components/common';

interface AddUserFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<AddUserFormData>();

  const onSubmit = (data: AddUserFormData) => {
    console.log(data);
  };

  return (
    <FormLayout title="Agregar usuario">
      <FormContainer title="Completa la información del usuario">
        <form onSubmit={handleSubmit(onSubmit)}></form>
      </FormContainer>
    </FormLayout>
  );
};
