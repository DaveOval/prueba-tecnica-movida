import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useAddStock } from '../../hooks/stock/useAddStock';

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
      status: 'Activo',
      quantity: 0,
      reserved_quantity: 0,
      available_quantity: 0,
    },
  });

  const { isLoading, addStockAction, error } = useAddStock();

  const onSubmit = async (data: AddStockFormData) => {
    try {
      // Format dates to ISO string
      const formattedData = {
        ...data,
        expiry_date: new Date(data.expiry_date).toISOString(),
        last_movement_date: new Date(data.last_movement_date).toISOString(),
      };

      await addStockAction(formattedData);
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="ID del producto"
              id="product_id"
              placeholder=""
              required
              type="text"
              error={errors.product_id?.message}
              {...register('product_id', {
                required: 'El ID del producto es requerido',
              })}
            />
            <Input
              label="ID del almacén"
              id="warehouse_id"
              placeholder=""
              required
              type="text"
              error={errors.warehouse_id?.message}
              {...register('warehouse_id', {
                required: 'El ID del almacén es requerido',
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Código de ubicación"
              id="location_code"
              placeholder=""
              required
              type="text"
              error={errors.location_code?.message}
              {...register('location_code', {
                required: 'El código de ubicación es requerido',
              })}
            />
            <Input
              label="Número de lote"
              id="batch_number"
              placeholder="Ej: BATCH-20240501"
              required
              type="text"
              error={errors.batch_number?.message}
              {...register('batch_number', {
                required: 'El número de lote es requerido',
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Fecha de vencimiento"
              id="expiry_date"
              placeholder="Fecha de vencimiento"
              required
              type="date"
              error={errors.expiry_date?.message}
              {...register('expiry_date', {
                required: 'La fecha de vencimiento es requerida',
                validate: (value) => {
                  const date = new Date(value);
                  return date > new Date() || 'La fecha debe ser futura';
                },
              })}
            />
            <Input
              label="Número de serie"
              id="serial_number"
              placeholder=""
              required
              type="text"
              error={errors.serial_number?.message}
              {...register('serial_number', {
                required: 'El número de serie es requerido',
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Cantidad"
              id="quantity"
              placeholder=""
              required
              type="number"
              error={errors.quantity?.message}
              {...register('quantity', {
                required: 'La cantidad es requerida',
                min: {
                  value: 0,
                  message: 'La cantidad debe ser mayor o igual a 0',
                },
              })}
            />
            <Input
              label="Cantidad reservada"
              id="reserved_quantity"
              placeholder=""
              required
              type="number"
              error={errors.reserved_quantity?.message}
              {...register('reserved_quantity', {
                required: 'La cantidad reservada es requerida',
                min: {
                  value: 0,
                  message: 'La cantidad reservada debe ser mayor o igual a 0',
                },
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Cantidad disponible"
              id="available_quantity"
              placeholder=""
              required
              type="number"
              error={errors.available_quantity?.message}
              {...register('available_quantity', {
                required: 'La cantidad disponible es requerida',
                min: {
                  value: 0,
                  message: 'La cantidad disponible debe ser mayor o igual a 0',
                },
              })}
            />
            <Input
              label="Fecha del último movimiento"
              id="last_movement_date"
              placeholder="Fecha del último movimiento"
              required
              type="datetime-local"
              error={errors.last_movement_date?.message}
              {...register('last_movement_date', {
                required: 'La fecha del último movimiento es requerida',
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Estado"
              id="status"
              placeholder="Ej: Activo"
              required
              type="text"
              error={errors.status?.message}
              {...register('status', {
                required: 'El estado es requerido',
                validate: (value) =>
                  value === 'Activo' ||
                  value === 'Inactivo' ||
                  'El estado debe ser Activo o Inactivo',
              })}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <SubmitButton
              type="submit"
              label="Agregar"
              loading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </FormContainer>
    </FormLayout>
  );
};
