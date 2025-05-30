import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, ToggleSwitch } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useAddWarehouse } from '../../hooks/warehouses/useAddWarehouse';

interface AddWarehouseFormData {
  warehouse_name: string;
  warehouse_code: string;
  square_meters: number;
  aisle_count: number;
  racks_per_aisle: number;
  levels_per_rack: number;
  Default: boolean;
  status: string;
}

export const AddWarehouse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddWarehouseFormData>({
    defaultValues: {
      Default: false,
      status: 'Activo',
    },
  });

  const isDefault = watch('Default');

  const { isLoading, addWarehouseAction, error } = useAddWarehouse();

  const onSubmit = async (data: AddWarehouseFormData) => {
    try {
      await addWarehouseAction(data);
      toast.success('Almacén agregado correctamente');
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
    <FormLayout title="Agregar almacén">
      <FormContainer title="Completa la información del almacén">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nombre del almacén"
            id="warehouse_name"
            placeholder="Nombre del almacén"
            required
            type="text"
            error={errors.warehouse_name?.message}
            {...register('warehouse_name')}
          />
          <Input
            label="Código del almacén"
            id="warehouse_code"
            placeholder="Código del almacén"
            required
            type="text"
            error={errors.warehouse_code?.message}
            {...register('warehouse_code')}
          />
          <Input
            label="Metros cuadrados"
            id="square_meters"
            placeholder="Metros cuadrados"
            required
            type="number"
            error={errors.square_meters?.message}
            {...register('square_meters')}
          />
          <Input
            label="Número de pasillos"
            id="aisle_count"
            placeholder="Número de pasillos"
            required
            type="number"
            error={errors.aisle_count?.message}
            {...register('aisle_count')}
          />
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
          <ToggleSwitch
            checked={isDefault}
            onChange={(value) => setValue('Default', value)}
            title="Almacén por defecto"
            required
            error={errors.Default?.message}
          />
          {error && <p className="text-red-500">{error}</p>}
          <SubmitButton
            type="submit"
            label="Agregar"
            loading={isLoading}
            disabled={isLoading}
          />
        </form>
      </FormContainer>
    </FormLayout>
  );
};
