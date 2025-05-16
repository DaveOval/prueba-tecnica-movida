interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-row bg-gray-100">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-12 rounded-l-2xl shadow-lg">
        {children}
      </div>
      <div className="flex-1 hidden md:block overflow-hidden rounded-r-2xl">
        <img 
          src="https://images.pexels.com/photos/30418340/pexels-photo-30418340/free-photo-of-letreros-tradicionales-chinos-en-el-barrio-chino-de-yakarta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="logo" 
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}
