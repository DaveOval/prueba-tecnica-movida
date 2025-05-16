interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
        <div>
            <h1>Dashboard</h1>
        </div>
        {children}
    </div>
  )
}
