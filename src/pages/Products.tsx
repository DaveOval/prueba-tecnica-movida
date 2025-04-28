import { useForm } from "react-hook-form";
import { FormLayout } from "../components/layout";

interface AricleFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const Products = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AricleFormData>();

  const onSubmit = (data: AricleFormData) => {
    console.log(data);
    reset();
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
            {/* Price */}
            <div>
              <label className="block text-gray-700 mb-2">Precio</label>
              <input
                type="number"
                {...register("price", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Precio del artículo"
              />
              {
                errors.price && (
                  <span className="text-red-500 text-sm">{errors.price.message}</span>
                )
              }
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
            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-2">Descripción</label>
              <textarea
                {...register("description", { required: "Este campo es requerido" })}
                className={`w-full p-2 border rounded ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Descripción del artículo"
                rows={4}
              ></textarea>
              {
                errors.description && (
                  <span className="text-red-500 text-sm">{errors.description.message}</span>
                )
              }
            </div>
          </div>
        </section>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Agregar Artículo
          </button>
        </div>
      </form>
    </FormLayout>
  )
}
