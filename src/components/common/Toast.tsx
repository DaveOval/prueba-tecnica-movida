import { Toaster } from 'react-hot-toast'

export const Toast = () => {
  return (
    <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4aed88',
              secondary: '#fff',
            },
          },
        }}
    />
  )
}
