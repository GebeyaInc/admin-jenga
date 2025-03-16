
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-6 transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "ml-20" : "ml-64"
          )}
        >
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
