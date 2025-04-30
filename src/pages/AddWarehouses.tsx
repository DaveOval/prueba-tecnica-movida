import { useForm } from "react-hook-form";
import { FormLayout } from "../components/layout";
import { useSaveWarehouses } from "../hooks/useSaveWarehouses";
import toast from 'react-hot-toast';

interface WarehouseFormData {
  name: string;
  location: string;
  description: string;
}

export const AddWarehouses = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<WarehouseFormData>();

  const { saveWarehouse, isLoading } = useSaveWarehouses();

  const onSubmit = async (data: WarehouseFormData) => {
    toast.loading('Agregando bodega...');
    try {
      await saveWarehouse(data);
      toast.success('Bodega agregada correctamente'); 
      reset();
    } catch (error) {
      toast.error('Error al agregar la bodega');
      console.error(error);
    } 
  };
  
  return (
    <FormLayout title="Agregar Bodega">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <section>
                <div>
                    <label className="block text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      {...register("name", { required: "Este campo es requerido" })}
                      className={`w-full p-2 border rounded ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Nombre de la bodega"
                    />
                    {
                      errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                      )
                    }
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Ubicación</label>
                    <input
                      type="text"
                      {...register("location", { required: "Este campo es requerido" })}
                      className={`w-full p-2 border rounded ${
                        errors.location ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Ubicación de la bodega"
                    />
                    {
                      errors.location && (
                        <span className="text-red-500 text-sm">{errors.location.message}</span>
                      )
                    }
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Descripción</label>
                    <textarea
                      {...register("description", { required: "Este campo es requerido" })}
                      className={`w-full p-2 border rounded ${
                        errors.description ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {
                      errors.description && (
                        <span className="text-red-500 text-sm">{errors.description.message}</span>
                      )
                    } 
                </div>
            </section>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'Agregando...' : 'Agregar Bodega'}
              </button> 
            </div>
        </form>
    </FormLayout>
  )
}
