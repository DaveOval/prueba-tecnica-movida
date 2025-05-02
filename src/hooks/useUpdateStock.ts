import { useCallback } from 'react';
import { updateProductStock } from '../services/productService';
import toast from 'react-hot-toast';

export const useUpdateStock = (onSuccess?: () => void) => {
    const updateStock = useCallback(async (productId: string, currentStock: number, amount: number) => {
        const newStock = currentStock + amount;
        const loadingToast = toast.loading("Actualizando stock...");

        try {
            await updateProductStock(productId, newStock);
            toast.dismiss(loadingToast);
            toast.success('Stock actualizado correctamente');
            onSuccess?.();
        } catch {
            toast.dismiss(loadingToast);
            toast.error('Error al actualizar el stock');
        }
    }, [onSuccess]);

    return { updateStock };
}; 