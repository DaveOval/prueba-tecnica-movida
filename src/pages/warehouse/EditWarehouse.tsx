import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FormContainer } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, ToggleSwitch } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useEditWarehouse } from '../../hooks/warehouses/useEditWarehouse';

interface EditWarehouseFormData {
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
}

export const EditWarehouse = () => {
  const { id } = useParams<{ id: string }>();

  const [isFormReady, setIsFormReady] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<EditWarehouseFormData>({
    defaultValues: {
      Default: false,
      status: 'Activo',
    },
  });

  const isDefault = watch('Default');

  const { isLoading, error, getWarehouseAction, updateWarehouseAction } =
    useEditWarehouse(id || '');

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        setIsFormReady(true);
        const data = await getWarehouseAction();
        console.log('data', data);
        reset(data);
      } catch (error) {
        console.error('Error fetching warehouse:', error);
      } finally {
        setIsFormReady(false);
      }
    };

    if (id) {
      fetchWarehouse();
    }
  }, [id, getWarehouseAction, reset]);

  const onSubmit = async (data: EditWarehouseFormData) => {
    try {
      await updateWarehouseAction(data);
    } catch (error) {
      console.error('Error updating warehouse:', error);
    }
  };

  return (
    <FormLayout title="Editar almacén" linkBack="/almacenes">
      <FormContainer title="Edita la información del almacén">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nombre del almacén"
              id="warehouse_name"
              placeholder="Nombre del almacén"
              required
              disabled={isFormReady}
              type="text"
              error={errors.warehouse_name?.message}
              {...register('warehouse_name')}
            />
            <Input
              label="Código del almacén"
              id="warehouse_code"
              placeholder="Código del almacén"
              required
              disabled={isFormReady}
              type="text"
              error={errors.warehouse_code?.message}
              {...register('warehouse_code')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Metros cuadrados"
              id="square_meters"
              placeholder="Metros cuadrados"
              required
              disabled={isFormReady}
              type="number"
              error={errors.square_meters?.message}
              {...register('square_meters')}
            />
            <Input
              label="Número de pasillos"
              id="aisle_count"
              placeholder="Número de pasillos"
              required
              disabled={isFormReady}
              type="number"
              error={errors.aisle_count?.message}
              {...register('aisle_count')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Racks por pasillo"
              id="racks_per_aisle"
              placeholder="Racks por pasillo"
              required
              disabled={isFormReady}
              type="number"
              error={errors.racks_per_aisle?.message}
              {...register('racks_per_aisle')}
            />
            <Input
              label="Niveles por rack"
              id="levels_per_rack"
              placeholder="Niveles por rack"
              required
              disabled={isFormReady}
              type="number"
              error={errors.levels_per_rack?.message}
              {...register('levels_per_rack')}
            />
          </div>
          <ToggleSwitch
            disabled={isFormReady}
            checked={isDefault}
            onChange={(value) => setValue('Default', value)}
            title="Almacén por defecto"
            required
            error={errors.Default?.message}
          />
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
