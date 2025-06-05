import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer, InputSelect } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, ToggleSwitch } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useEditWarehouse } from '../../hooks/warehouses/useEditWarehouse';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      aisle_count: 1,
      racks_per_aisle: 1,
      levels_per_rack: 1,
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
        setValue('warehouse_name', data.warehouse_name);
        setValue('warehouse_code', data.warehouse_code);
        setValue('square_meters', data.square_meters);
        setValue('aisle_count', data.aisle_count);
        setValue('racks_per_aisle', data.racks_per_aisle);
        setValue('levels_per_rack', data.levels_per_rack);
        setValue('Default', data.Default);
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
      toast.success('Almacén actualizado correctamente');
      navigate('/almacenes');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al actualizar el almacén';
      toast.error(errorMessage);
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
              {...register('warehouse_name', {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    'El nombre del almacén debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 100,
                  message:
                    'El nombre del almacén no puede exceder los 100 caracteres',
                },
                validate: (value) => {
                  const forbiddenPattern = /['";,]|--|\/\*|\*\//;
                  return (
                    !forbiddenPattern.test(value) ||
                    'El nombre del almacén contiene caracteres no permitidos'
                  );
                },
              })}
            />
            <Input
              label="Código del almacén"
              id="warehouse_code"
              placeholder="Código del almacén"
              required
              disabled={isFormReady}
              type="text"
              error={errors.warehouse_code?.message}
              {...register('warehouse_code', {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    'El código del almacén debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 10,
                  message:
                    'El código del almacén no puede exceder los 10 caracteres',
                },
                validate: (value) => {
                  const forbiddenPattern = /['";,]|--|\/\*|\*\//;
                  return (
                    !forbiddenPattern.test(value) ||
                    'El código del almacén contiene caracteres no permitidos'
                  );
                },
              })}
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
              {...register('square_meters', {
                required: true,
                min: {
                  value: 1,
                  message: 'El área debe ser mayor a 0',
                },
              })}
            />
            <Input
              label="Número de pasillos"
              id="aisle_count"
              placeholder="Número de pasillos"
              required
              disabled={isFormReady}
              type="number"
              error={errors.aisle_count?.message}
              {...register('aisle_count', {
                required: true,
                min: {
                  value: 1,
                  message: 'El número de pasillos debe ser mayor a 0',
                },
              })}
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
              {...register('racks_per_aisle', {
                required: true,
                min: {
                  value: 1,
                  message: 'El número de racks debe ser mayor a 0',
                },
              })}
            />
            <Input
              label="Niveles por rack"
              id="levels_per_rack"
              placeholder="Niveles por rack"
              required
              disabled={isFormReady}
              type="number"
              error={errors.levels_per_rack?.message}
              {...register('levels_per_rack', {
                required: true,
                min: {
                  value: 1,
                  message: 'El número de niveles debe ser mayor a 0',
                },
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ToggleSwitch
              disabled={isFormReady}
              checked={isDefault}
              onChange={(value) => setValue('Default', value)}
              title="Almacén por defecto"
              required
              error={errors.Default?.message}
            />
            <InputSelect
              label="Estado"
              id="status"
              placeholder="Estado del almacén"
              required
              disabled={isFormReady}
              error={errors.status?.message}
              options={[
                { label: 'Activo', value: 'Activo' },
                { label: 'Inactivo', value: 'Inactivo' },
              ]}
              {...register('status', {
                required: true,
              })}
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
