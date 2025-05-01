import { useForm } from "react-hook-form";
import { FormLayout } from "../components/layout";
import toast from 'react-hot-toast';
import { useSavePorduct } from "../hooks/useSaveProduct";

interface AricleFormData {
  name: string;
  SKU: string;
  stock: number;
  package_number: number;
  provider: string;
  registration_date: string;
  warehouse_location: string;
}

export const Products = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AricleFormData>();

  const { saveProduct, isLoading } = useSavePorduct();

  const onSubmit = async (data: AricleFormData) => {

    const loadingToast = toast.loading("Agregando producto...");

    const { error, success } = await saveProduct(data);

    toast.dismiss(loadingToast);

    if (error) {
      toast.error(error);
      return;
    }

    if (success) {
      toast.success(success);
      reset();
    }

  };

  return (
    <FormLayout title="Agregar Nuevo Artículo">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic data */}
        <section>
          <h2 className="text-xl font-semibold mb-">Datos basicos</h2>
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input 
                type="text"
                {...register("name", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nombre del artículo"
              />
              {
                errors.name && (
                  <span className="text-red-500 text-sm">{errors.name.message}</span>
                )
              }
            </div>
            {/* SKU */}
            <div>
              <label className="block text-gray-700 mb-2">SKU</label>
              <input
                type="text"
                {...register("SKU", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.SKU ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Código SKU"
              />
              {
                errors.SKU && (
                  <span className="text-red-500 text-sm">{errors.SKU.message}</span>
                )
              }
            </div>
            {/* Package Number */}
            <div>
              <label className="block text-gray-700 mb-2">Número de Paquete</label>
              <input
                type="number"
                {...register("package_number", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.package_number ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Número de paquete"
              />
              {
                errors.package_number && (
                  <span className="text-red-500 text-sm">{errors.package_number.message}</span>
                )
              }
            </div>
            {/* Provider */}
            <div>
              <label className="block text-gray-700 mb-2">Proveedor</label>
              <input
                type="text"
                {...register("provider", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.provider ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nombre del proveedor"
              />
              {
                errors.provider && (
                  <span className="text-red-500 text-sm">{errors.provider.message}</span>
                )
              }
            </div>
            {/* Registration Date */}
            <div>
              <label className="block text-gray-700 mb-2">Fecha de Registro</label>
              <input
                type="date"
                {...register("registration_date", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.registration_date ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Fecha de registro"
              />
              {
                errors.registration_date && (
                  <span className="text-red-500 text-sm">{errors.registration_date.message}</span>
                )
              }
            </div>
            {/* Warehouse Location */}
            <div>
              <label className="block text-gray-700 mb-2">Ubicación en Almacén</label>
              <input
                type="text"
                {...register("warehouse_location", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.warehouse_location ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ubicación en el almacén"
              />
              {
                errors.warehouse_location && (
                  <span className="text-red-500 text-sm">{errors.warehouse_location.message}</span>
                )
              }
            </div>
          </div>
            {/* Stock */}
            <div>
              <label className="block text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                {...register("stock", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Cantidad en stock"
              />
              {
                errors.stock && (
                  <span className="text-red-500 text-sm">{errors.stock.message}</span>
                )
              }
            </div>
          </section>
        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Agregando..." : "Agregar Artículo"}
          </button>
        </div>
      </form>
    </FormLayout>
  )
}
