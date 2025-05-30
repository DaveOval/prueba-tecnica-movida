import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FormContainer } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, ToggleSwitch } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';

interface EditProductFormData {
  name: string;
  description: string;
  category: string;
  unit_of_measure: string;
  barcode: string;
  is_batch_tracked: boolean;
  is_expiry_tracked: boolean;
  min_stock_level: number;
  max_stock_level: number;
  default_location: string;
  supplier_id: string;
  price: number;
}

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditProductFormData>({
    defaultValues: {
      is_batch_tracked: false,
      is_expiry_tracked: false,
    },
  });

  const isBatchTracked = watch('is_batch_tracked');
  const isExpiryTracked = watch('is_expiry_tracked');

  const onSubmit = async (data: EditProductFormData) => {
    // TODO: Implement edit product logic
    console.log('Product ID:', id);
    console.log('Form data:', data);
  };

  return (
    <FormLayout title="Editar producto">
      <FormContainer title="Edita la información del producto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nombre"
            id="name"
            placeholder="Nombre del producto"
            required
            type="text"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Descripción"
            id="description"
            placeholder="Descripción del producto"
            required
            type="text"
            error={errors.description?.message}
            {...register('description')}
          />
          <Input
            label="Categoría"
            id="category"
            placeholder="Categoría del producto"
            required
            type="text"
            error={errors.category?.message}
            {...register('category')}
          />
          <Input
            label="Unidad de medida"
            id="unit_of_measure"
            placeholder="Unidad de medida del producto"
            required
            type="text"
            error={errors.unit_of_measure?.message}
            {...register('unit_of_measure')}
          />
          <Input
            label="Código de barras"
            id="barcode"
            placeholder="Código de barras del producto"
            required
            type="text"
            error={errors.barcode?.message}
            {...register('barcode')}
          />
          <ToggleSwitch
            checked={isBatchTracked}
            onChange={(value) => setValue('is_batch_tracked', value)}
            title="Es un lote"
            required
            error={errors.is_batch_tracked?.message}
          />
          <ToggleSwitch
            checked={isExpiryTracked}
            onChange={(value) => setValue('is_expiry_tracked', value)}
            title="Es vencimiento"
            required
            error={errors.is_expiry_tracked?.message}
          />
          <Input
            label="Nivel mínimo de stock"
            id="min_stock_level"
            placeholder="Nivel mínimo de stock"
            required
            type="number"
            error={errors.min_stock_level?.message}
            {...register('min_stock_level')}
          />
          <Input
            label="Nivel máximo de stock"
            id="max_stock_level"
            placeholder="Nivel máximo de stock"
            required
            type="number"
            error={errors.max_stock_level?.message}
            {...register('max_stock_level')}
          />
          <Input
            label="Ubicación por defecto"
            id="default_location"
            placeholder="Ubicación por defecto"
            required
            type="text"
            error={errors.default_location?.message}
            {...register('default_location')}
          />
          <Input
            label="Proveedor"
            id="supplier_id"
            placeholder="Proveedor"
            required
            type="text"
            error={errors.supplier_id?.message}
            {...register('supplier_id')}
          />
          <Input
            label="Precio"
            id="price"
            placeholder="Precio"
            required
            type="number"
            error={errors.price?.message}
            {...register('price')}
          />
          <SubmitButton
            type="submit"
            label="Guardar cambios"
            loading={false}
            disabled={false}
          />
        </form>
      </FormContainer>
    </FormLayout>
  );
};
