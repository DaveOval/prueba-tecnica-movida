import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer, InputSelect } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, ToggleSwitch } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useAddWarehouse } from '../../hooks/warehouses/useAddWarehouse';
import { useNavigate } from 'react-router-dom';

interface AddWarehouseFormData {
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  default: boolean;
  status: string;
}

export const AddWarehouse = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<AddWarehouseFormData>({
    defaultValues: {
      status: 'Activo',
      default: true,
      aisle_count: 1,
      racks_per_aisle: 1,
      levels_per_rack: 1,
    },
  });

  const isDefault = watch('default');

  const { isLoading, addWarehouseAction, error } = useAddWarehouse();

  const onSubmit = async (data: AddWarehouseFormData) => {
    try {
      await addWarehouseAction(data);
      toast.success('Almacén agregado correctamente');
      reset();
      navigate('/almacenes');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al agregar el almacén';
      toast.error(errorMessage);
    }
  };

  return (
    <FormLayout title="Agregar almacén" linkBack="/almacenes">
      <FormContainer title="Completa la información del almacén">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nombre del almacén"
              id="warehouse_name"
              placeholder="Nombre del almacén"
              required
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
              placeholder="Código corto para identificarlo (Ej: ALM1, TEST)"
              required
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
              placeholder="Metros cuadrados del almacén"
              required
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
              type="number"
              error={errors.racks_per_aisle?.message}
              {...register('racks_per_aisle')}
            />
            <Input
              label="Niveles por rack"
              id="levels_per_rack"
              placeholder="Niveles por rack"
              required
              type="number"
              error={errors.levels_per_rack?.message}
              {...register('levels_per_rack')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ToggleSwitch
              checked={isDefault}
              onChange={(value) => setValue('default', value)}
              title="Almacén por defecto"
              required
              error={errors.default?.message}
            />
            <InputSelect
              label="Estado"
              id="status"
              placeholder="Estado del almacén"
              required
              error={errors.status?.message}
              options={[
                { label: 'Activo', value: 'Activo', selected: true },
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
