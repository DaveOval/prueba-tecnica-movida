
interface FormAuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const FormAuthLayout = ({ children, title }: FormAuthLayoutProps) => {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
    </div>
  )
}