import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer, ToggleSwitch } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, InputSelect } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useEditStock } from '../../hooks/stock/useEditStock';

interface EditStockFormData {
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

export const EditStock = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFormReady, setIsFormReady] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditStockFormData>({
    defaultValues: {
      status: 'Activo',
      quantity: 0,
      reserved_quantity: 0,
      available_quantity: 0,
    },
  });

  const isDefault = watch('status');

  const { isLoading, error, getStockAction, updateStockAction } = useEditStock(
    id || ''
  );

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setIsFormReady(true);
        const data = await getStockAction();
        const { stock } = data;

        if (stock.product_id) {
          setValue('product_id', stock.product_id);
        }
        setValue('warehouse_id', stock.warehouse_id._id);
        setValue('location_code', stock.location_code);
        setValue('batch_number', stock.batch_number);
        setValue(
          'expiry_date',
          new Date(stock.expiry_date).toISOString().split('T')[0]
        );
        setValue('serial_number', stock.serial_number);
        setValue('quantity', stock.quantity);
        setValue('reserved_quantity', stock.reserved_quantity);
        setValue('available_quantity', stock.available_quantity);
        setValue(
          'last_movement_date',
          new Date(stock.last_movement_date).toISOString().slice(0, 16)
        );
        setValue('status', stock.status);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError?.response?.data?.message ||
          axiosError?.message ||
          'Error al obtener el stock';
        toast.error(errorMessage);
      } finally {
        setIsFormReady(false);
      }
    };

    if (id) {
      fetchStock();
    }
  }, [id, getStockAction, setValue]);

  const onSubmit = async (data: EditStockFormData) => {
    try {
      const formattedData = {
        ...data,
        expiry_date: new Date(data.expiry_date).toISOString(),
        last_movement_date: new Date(data.last_movement_date).toISOString(),
      };

      await updateStockAction(formattedData);
      toast.success('Stock actualizado correctamente');
      navigate('/stock');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al actualizar el stock';
      toast.error(errorMessage);
    }
  };

  return (
    <FormLayout title="Editar stock" linkBack="/stock">
      <FormContainer title="Edita la información del stock">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputSelect
              label="Producto"
              id="product_id"
              placeholder="Selecciona un producto"
              required
              error={errors.product_id?.message}
              options={[]}
              disabled={isFormReady}
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
              options={[]}
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              disabled={isFormReady}
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
              label="Guardar cambios"
              loading={isLoading}
              disabled={isLoading || isFormReady}
            />
          </div>
        </form>
      </FormContainer>
    </FormLayout>
  );
};
