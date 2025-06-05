import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FormContainer } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, ToggleSwitch } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useEditProduct } from '../../hooks/products/useEditProduct';

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

  const [isFormReady, setIsFormReady] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<EditProductFormData>({
    defaultValues: {
      is_batch_tracked: false,
      is_expiry_tracked: false,
    },
  });

  const isBatchTracked = watch('is_batch_tracked');
  const isExpiryTracked = watch('is_expiry_tracked');

  const { isLoading, error, getProductAction, updateProductAction } =
    useEditProduct(id || '');

  useEffect(() => {
    console.log('id', id);
    const fetchProduct = async () => {
      try {
        setIsFormReady(true);
        const data = await getProductAction();

        const { product } = data;

        setValue('name', product.name);
        setValue('description', product.description);
        setValue('category', product.category);
        setValue('unit_of_measure', product.unit_of_measure);
        setValue('barcode', product.barcode);
        setValue('min_stock_level', product.min_stock_level);
        setValue('max_stock_level', product.max_stock_level);
        setValue('default_location', product.default_location);
        setValue('supplier_id', product.supplier_id);
        setValue('price', product.price.$numberDecimal);
        setValue('is_batch_tracked', product.is_batch_tracked);
        setValue('is_expiry_tracked', product.is_expiry_tracked);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsFormReady(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, getProductAction, reset, setValue]);

  const onSubmit = async (data: EditProductFormData) => {
    try {
      await updateProductAction(data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <FormLayout title="Editar producto" linkBack="/productos">
      <FormContainer title="Edita la información del producto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nombre"
              id="name"
              placeholder="Nombre del producto"
              required
              type="text"
              disabled={isFormReady}
              error={errors.name?.message}
              {...register('name', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 100,
                  message: 'El nombre no puede exceder los 100 caracteres',
                },
                validate: (value) => {
                  const forbiddenPattern = /['";,]|--|\/\*|\*\//;
                  return (
                    !forbiddenPattern.test(value) ||
                    'El nombre contiene caracteres no permitidos'
                  );
                },
              })}
            />
            <Input
              label="Descripción"
              id="description"
              placeholder="Descripción del producto"
              required
              type="text"
              disabled={isFormReady}
              error={errors.description?.message}
              {...register('description', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'La descripción debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 500,
                  message: 'La descripción no puede exceder los 500 caracteres',
                },
                validate: (value) => {
                  const forbiddenPattern = /['";,]|--|\/\*|\*\//;
                  return (
                    !forbiddenPattern.test(value) ||
                    'La descripción contiene caracteres no permitidos'
                  );
                },
              })}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Categoría"
              id="category"
              placeholder="Categoría o familia (Ej: Bebidas, Componentes, etc.)"
              required
              type="text"
              disabled={isFormReady}
              error={errors.category?.message}
              {...register('category', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'La categoría debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 50,
                  message: 'La categoría no puede exceder los 50 caracteres',
                },
                validate: (value) => {
                  const forbiddenPattern = /['";,]|--|\/\*|\*\//;
                  return (
                    !forbiddenPattern.test(value) ||
                    'La categoría contiene caracteres no permitidos'
                  );
                },
              })}
            />
            <Input
              label="Unidad de medida"
              id="unit_of_measure"
              placeholder="Unidad principal de medida (Ej: kg, pieza, caja)"
              required
              type="text"
              disabled={isFormReady}
              error={errors.unit_of_measure?.message}
              {...register('unit_of_measure', {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    'La unidad de medida debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 10,
                  message:
                    'La unidad de medida no puede exceder los 10 caracteres',
                },
              })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Código de barras"
              id="barcode"
              placeholder="Código de barras"
              type="text"
              disabled={isFormReady}
              error={errors.barcode?.message}
              {...register('barcode', {
                required: false,
                minLength: {
                  value: 3,
                  message:
                    'El código de barras debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 50,
                  message:
                    'El código de barras no puede exceder los 50 caracteres',
                },
              })}
            />
            <Input
              label="Nivel mínimo de stock"
              id="min_stock_level"
              placeholder="Nivel mínimo de stock"
              required
              type="number"
              disabled={isFormReady}
              error={errors.min_stock_level?.message}
              {...register('min_stock_level')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nivel máximo de stock"
              id="max_stock_level"
              placeholder="Nivel máximo de stock"
              required
              type="number"
              disabled={isFormReady}
              error={errors.max_stock_level?.message}
              {...register('max_stock_level')}
            />
            <Input
              label="Ubicación por defecto"
              id="default_location"
              placeholder="Ubicación por defecto"
              required
              type="text"
              disabled={isFormReady}
              error={errors.default_location?.message}
              {...register('default_location')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Proveedor"
              id="supplier_id"
              placeholder="Proveedor"
              required
              type="text"
              disabled={isFormReady}
              error={errors.supplier_id?.message}
              {...register('supplier_id')}
            />
            <Input
              label="Precio"
              id="price"
              placeholder="Precio"
              required
              type="number"
              disabled={isFormReady}
              error={errors.price?.message}
              {...register('price')}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ToggleSwitch
              checked={isBatchTracked}
              onChange={(value) => setValue('is_batch_tracked', value)}
              title="Es un lote"
              required
              disabled={isFormReady}
              error={errors.is_batch_tracked?.message}
            />
            <ToggleSwitch
              checked={isExpiryTracked}
              onChange={(value) => setValue('is_expiry_tracked', value)}
              title="Es vencimiento"
              required
              disabled={isFormReady}
              error={errors.is_expiry_tracked?.message}
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
