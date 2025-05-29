interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
}

export const FormContainer = ({ children, title }: FormContainerProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {title && (
        <h2 className="text-l font-medium mb-4 w-full h-auto  border-b border-gray-200 py-4 px-6">
          {title}
        </h2>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
