import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { FormContainer, InputSelect } from '../../components/common';
import { FormLayout } from '../../components/layout/';
import { Input, ToggleSwitch } from '../../components/common/';
import { SubmitButton } from '../../components/common/SubmitButton';
import { useEditProduct } from '../../hooks/products/useEditProduct';
import { useNavigate } from 'react-router-dom';

interface EditProductFormData {
  name: string;
  description: string;
  category: string;
  unit_of_measure: string;
  unit_base: string;
  unit_logistic: string;
  factor_convertor: number;
  barcode: string;
  is_batch_tracked: boolean;
  is_expiry_tracked: boolean;
  min_stock_level: number;
  max_stock_level: number;
  default_location: string;
  supplier_id: string;
  price: number;
  status: string;
}

export const EditProduct = () => {
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
    const fetchProduct = async () => {
      try {
        setIsFormReady(true);
        const data = await getProductAction();

        const { product } = data;

        setValue('name', product.name);
        setValue('description', product.description);
        setValue('category', product.category);
        setValue('unit_of_measure', product.unit_of_measure);
        setValue('unit_base', product.unit_base);
        setValue('unit_logistic', product.unit_logistic);
        setValue('factor_convertor', product.factor_convertor);
        setValue('barcode', product.barcode);
        setValue('min_stock_level', product.min_stock_level);
        setValue('max_stock_level', product.max_stock_level);
        setValue('default_location', product.default_location);
        setValue('supplier_id', product.supplier_id);
        setValue('price', product.price.$numberDecimal);
        setValue('status', product.status);
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
      toast.success('Producto actualizado correctamente');
      navigate('/productos');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        axiosError?.message ||
        'Error al actualizar el producto';
      toast.error(errorMessage);
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
            <InputSelect
              label="Categoría"
              id="category"
              placeholder="Categoría o familia (Ej: Bebidas, Componentes, etc.)"
              required
              error={errors.category?.message}
              disabled={isFormReady}
              options={[
                { label: 'Bebidas', value: 'bebidas' },
                { label: 'Componentes', value: 'componentes' },
                { label: 'Electrónica', value: 'electronica' },
                { label: 'Herramientas', value: 'herramientas' },
                { label: 'Hogar', value: 'hogar' },
              ]}
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
              label="Unidad base"
              id="unidad_base"
              placeholder="Unidad mínima de inventario (Ej: pieza, caja, etc.)"
              type="text"
              required
              disabled={isFormReady}
              error={errors.unit_base?.message}
              {...register('unit_base', {
                required: true,
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
              label="Unidad logística"
              id="unidad_logistica"
              placeholder="Unidad en la que se recibe/envía (Ej: 'caja')"
              required
              type="text"
              disabled={isFormReady}
              error={errors.unit_logistic?.message}
              {...register('unit_logistic', {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    'La unidad logística debe tener al menos 3 caracteres',
                },
                maxLength: {
                  value: 50,
                  message:
                    'La unidad logística no puede exceder los 50 caracteres',
                },
              })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Factor de conversión"
              id="factor_conversion"
              placeholder="Factor de conversión"
              type="number"
              disabled={isFormReady}
              error={errors.factor_convertor?.message}
              {...register('factor_convertor', {
                required: false,
              })}
            />
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
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nivel mínimo de stock"
              id="min_stock_level"
              placeholder="Nivel mínimo para alertas de inventario bajo"
              type="number"
              disabled={isFormReady}
              error={errors.min_stock_level?.message}
              {...register('min_stock_level', {
                required: false,
              })}
            />
            <Input
              label="Nivel máximo de stock"
              id="max_stock_level"
              placeholder="Nivel máximo recomendado (para planeación)"
              type="number"
              disabled={isFormReady}
              error={errors.max_stock_level?.message}
              {...register('max_stock_level', {
                required: false,
              })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Ubicación por defecto"
              id="default_location"
              placeholder="Ubicación estándar en almacén (Ej: A1-R1-E3)"
              type="text"
              disabled={isFormReady}
              error={errors.default_location?.message}
              {...register('default_location', {
                required: false,
                minLength: {
                  value: 3,
                  message: 'La ubicación debe tener al menos 3 caracteres',
                },
              })}
            />
            <InputSelect
              label="Proveedor"
              id="supplier_id"
              placeholder="ID del proveedor principal"
              disabled={isFormReady}
              error={errors.supplier_id?.message}
              options={[
                { label: 'Proveedor 1', value: '1' },
                { label: 'Proveedor 2', value: '2' },
                { label: 'Proveedor 3', value: '3' },
              ]}
              {...register('supplier_id', {
                required: false,
              })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Precio"
              id="price"
              placeholder="Precio unitario de referencia"
              type="number"
              disabled={isFormReady}
              error={errors.price?.message}
              {...register('price', {
                required: false,
                min: {
                  value: 0,
                  message: 'El precio debe ser mayor a 0',
                },
                max: {
                  value: 1000000,
                  message: 'El precio no puede exceder los 1,000,000',
                },
              })}
            />
            <InputSelect
              label="Estado"
              id="status"
              placeholder="Estado del producto"
              disabled={isFormReady}
              error={errors.status?.message}
              {...register('status', {
                required: false,
              })}
              options={[
                { label: 'Activo', value: 'Activo', selected: true },
                { label: 'Inactivo', value: 'Inactivo' },
                { label: 'Obsoleto', value: 'Obsoleto' },
              ]}
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
