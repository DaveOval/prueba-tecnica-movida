import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';

interface AddStockFormData {
  product_id: string;
  warehouse_id: string;
  location_code: string;
  batch_number: string;
  expiry_date: string;
  serial_number: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
  last_movement_date: string;
  status: string;
}

export const AddStock = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStockFormData>({
    defaultValues: {
      status: 'active',
    },
  });

  const onSubmit = async (data: AddStockFormData) => {
    try {
      // TODO: Implement addStockAction hook
      // await addStockAction(data);
      toast.success('Stock agregado correctamente');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al agregar el stock';
      toast.error(errorMessage);
    }
  };

  return (
    <FormLayout title="Agregar stock">
      <FormContainer title="Completa la información del stock">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="ID del producto"
            id="product_id"
            placeholder="ID del producto"
            required
            type="text"
            error={errors.product_id?.message}
            {...register('product_id')}
          />
          <Input
            label="ID del almacén"
            id="warehouse_id"
            placeholder="ID del almacén"
            required
            type="text"
            error={errors.warehouse_id?.message}
            {...register('warehouse_id')}
          />
          <Input
            label="Código de ubicación"
            id="location_code"
            placeholder="Código de ubicación"
            required
            type="text"
            error={errors.location_code?.message}
            {...register('location_code')}
          />
          <Input
            label="Número de lote"
            id="batch_number"
            placeholder="Número de lote"
            required
            type="text"
            error={errors.batch_number?.message}
            {...register('batch_number')}
          />
          <Input
            label="Fecha de vencimiento"
            id="expiry_date"
            placeholder="Fecha de vencimiento"
            required
            type="date"
            error={errors.expiry_date?.message}
            {...register('expiry_date')}
          />
          <Input
            label="Número de serie"
            id="serial_number"
            placeholder="Número de serie"
            required
            type="text"
            error={errors.serial_number?.message}
            {...register('serial_number')}
          />
          <Input
            label="Cantidad"
            id="quantity"
            placeholder="Cantidad"
            required
            type="number"
            error={errors.quantity?.message}
            {...register('quantity')}
          />
          <Input
            label="Cantidad reservada"
            id="reserved_quantity"
            placeholder="Cantidad reservada"
            required
            type="number"
            error={errors.reserved_quantity?.message}
            {...register('reserved_quantity')}
          />
          <Input
            label="Cantidad disponible"
            id="available_quantity"
            placeholder="Cantidad disponible"
            required
            type="number"
            error={errors.available_quantity?.message}
            {...register('available_quantity')}
          />
          <Input
            label="Fecha del último movimiento"
            id="last_movement_date"
            placeholder="Fecha del último movimiento"
            required
            type="datetime-local"
            error={errors.last_movement_date?.message}
            {...register('last_movement_date')}
          />
          <Input
            label="Estado"
            id="status"
            placeholder="Estado"
            required
            type="text"
            error={errors.status?.message}
            {...register('status')}
          />
          <SubmitButton
            type="submit"
            label="Agregar"
            loading={false}
            disabled={false}
          />
        </form>
      </FormContainer>
    </FormLayout>
  );
};
