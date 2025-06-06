import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer, ToggleSwitch } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, InputSelect } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useAddStock } from '../../hooks/stock/useAddStock';
import { useNavigate } from 'react-router-dom';
import { useGetWarehousesList } from '../../hooks/warehouses/useGetWarehouseList';

interface AddStockFormData {
  product_id: string; // Referens to a product
  warehouse_id: string; // Referens to a warehouse
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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<AddStockFormData>({
    defaultValues: {
      status: 'Activo',
      quantity: 0,
      reserved_quantity: 0,
      available_quantity: 0,
    },
  });

  const isDefault = watch('status');

  const { isLoading, addStockAction, error } = useAddStock();

  const { warehousesList, getWarehousesListAction } = useGetWarehousesList();

  useEffect(() => {
    getWarehousesListAction();
  }, [getWarehousesListAction]);

  console.log(warehousesList);

  const onSubmit = async (data: AddStockFormData) => {
    try {
      const formattedData = {
        ...data,
        expiry_date: new Date(data.expiry_date).toISOString(),
        last_movement_date: new Date(data.last_movement_date).toISOString(),
      };

      await addStockAction(formattedData);
      toast.success('Stock agregado correctamente');
      reset();
      navigate('/stock');
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
    <FormLayout title="Agregar stock" linkBack="/stock">
      <FormContainer title="Completa la información del stock">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputSelect
              label="Producto"
              id="product_id"
              placeholder="Selecciona un producto"
              required
              error={errors.product_id?.message}
              options={[]}
              {...register('product_id', {
                required: 'El producto es requerido',
              })}
            />
            <InputSelect
              label="Almacén"
              id="warehouse_id"
              placeholder="Selecciona un almacén"
              required
              error={errors.warehouse_id?.message}
              options={
                warehousesList?.map((warehouse) => ({
                  label: warehouse.warehouses,
                  value: warehouse.id,
                })) || []
              }
              {...register('warehouse_id', {
                required: 'El almacén es requerido',
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Código de ubicación"
              id="location_code"
              placeholder="Ubicación específica (Ej: A1-R3-E2)"
              required
              type="text"
              error={errors.location_code?.message}
              {...register('location_code', {
                required: 'El código de ubicación es requerido',
                minLength: {
                  value: 1,
                  message: 'El código de ubicación es requerido',
                },
                maxLength: {
                  value: 30,
                  message:
                    'El código de ubicación no puede exceder los 30 caracteres',
                },
              })}
            />
            <Input
              label="Número de lote"
              id="batch_number"
              placeholder="Número de lote (si aplica)"
              required
              type="text"
              error={errors.batch_number?.message}
              {...register('batch_number', {
                required: 'El número de lote es requerido',
                minLength: {
                  value: 1,
                  message: 'El número de lote es requerido',
                },
                maxLength: {
                  value: 30,
                  message:
                    'El número de lote no puede exceder los 30 caracteres',
                },
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Fecha de vencimiento"
              id="expiry_date"
              placeholder="Fecha de caducidad (si aplica)"
              type="date"
              error={errors.expiry_date?.message}
              {...register('expiry_date', {
                validate: (value) => {
                  const date = new Date(value);
                  return date > new Date() || 'La fecha debe ser futura';
                },
              })}
            />
            <Input
              label="Número de serie"
              id="serial_number"
              placeholder="Número de serie"
              type="text"
              error={errors.serial_number?.message}
              {...register('serial_number', {
                maxLength: {
                  value: 50,
                  message:
                    'El número de serie no puede exceder los 50 caracteres',
                },
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Cantidad"
              id="quantity"
              placeholder="Cantidad disponible"
              type="number"
              error={errors.quantity?.message}
              {...register('quantity', {
                validate: (value) => {
                  if (value < 0) {
                    return 'La cantidad debe ser mayor o igual a 0';
                  }
                  return true;
                },
              })}
            />
            <Input
              label="Cantidad reservada"
              id="reserved_quantity"
              placeholder="Cantidad reservada para pedidos o producción"
              type="number"
              error={errors.reserved_quantity?.message}
              {...register('reserved_quantity', {
                validate: (value) => {
                  if (value < 0) {
                    return 'La cantidad reservada debe ser mayor o igual a 0';
                  }
                  return true;
                },
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Cantidad disponible"
              id="available_quantity"
              placeholder="Cantidad disponible real"
              type="number"
              error={errors.available_quantity?.message}
              {...register('available_quantity', {
                validate: (value) => {
                  if (value < 0) {
                    return 'La cantidad disponible debe ser mayor o igual a 0';
                  }
                  return true;
                },
              })}
            />
            <Input
              label="Fecha del último movimiento"
              id="last_movement_date"
              placeholder="Última fecha de entrada/salida"
              type="datetime-local"
              error={errors.last_movement_date?.message}
              {...register('last_movement_date')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ToggleSwitch
              checked={isDefault === 'Activo'}
              onChange={(value) =>
                setValue('status', value ? 'Activo' : 'Inactivo')
              }
              title="Estado"
              required
              error={errors.status?.message}
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
