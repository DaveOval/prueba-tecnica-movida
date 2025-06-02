import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FormContainer, ToggleSwitch } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useEditStock } from '../../hooks/stock/useEditStock';

interface EditStockFormData {
  warehouse_id: string;
  location_code: string;
  batch_number: string;
  expiry_date: string;
  serial_number: string;
  quantity: number;
  reserved_quantity: number;
  available_quantity: number;
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
  } = useForm<EditStockFormData>();

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
        setValue('status', stock.status);
      } catch (error) {
        console.error('Error fetching stock:', error);
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
      await updateStockAction(data);
      navigate('/stock');
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <FormLayout title="Editar stock" linkBack="/stock">
      <FormContainer title="Edita la información del stock">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Código de ubicación"
              id="location_code"
              placeholder="Código de ubicación"
              required
              type="text"
              disabled={isFormReady}
              error={errors.location_code?.message}
              {...register('location_code')}
            />
            <Input
              label="Número de lote"
              id="batch_number"
              placeholder="Número de lote"
              required
              type="text"
              disabled={isFormReady}
              error={errors.batch_number?.message}
              {...register('batch_number')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Fecha de vencimiento"
              id="expiry_date"
              placeholder="Fecha de vencimiento"
              required
              type="date"
              disabled={isFormReady}
              error={errors.expiry_date?.message}
              {...register('expiry_date')}
            />
            <Input
              label="Número de serie"
              id="serial_number"
              placeholder="Número de serie"
              required
              type="text"
              disabled={isFormReady}
              error={errors.serial_number?.message}
              {...register('serial_number')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Cantidad"
              id="quantity"
              placeholder="Cantidad"
              required
              type="number"
              disabled={isFormReady}
              error={errors.quantity?.message}
              {...register('quantity')}
            />
            <Input
              label="Cantidad reservada"
              id="reserved_quantity"
              placeholder="Cantidad reservada"
              required
              type="number"
              disabled={isFormReady}
              error={errors.reserved_quantity?.message}
              {...register('reserved_quantity')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Cantidad disponible"
              id="available_quantity"
              placeholder="Cantidad disponible"
              required
              type="number"
              disabled={isFormReady}
              error={errors.available_quantity?.message}
              {...register('available_quantity')}
            />
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
