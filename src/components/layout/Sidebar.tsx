import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Building, 
  ActivitySquare, 
  Code, 
  Bell,
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
  section?: string;
}

const navItems: NavItem[] = [
  { 
    title: 'Summary', 
    icon: Building, 
    path: '/tenants', 
    section: 'main' 
  },
  { 
    title: 'Analytics', 
    icon: ActivitySquare, 
    path: '/analytics', 
    section: 'management' 
  },
  { 
    title: 'API & Developers', 
    icon: Code, 
    path: '/developers', 
    section: 'management' 
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col bg-white shadow-subtle transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center px-4 border-b">
        {!collapsed ? (
          <h1 className="text-xl font-medium">Admin Portal</h1>
        ) : (
          <div className="mx-auto text-xl font-bold">AP</div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-6">
          {['main', 'management'].map((section) => (
            <div key={section} className="space-y-2">
              {!collapsed && (
                <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section === 'main' ? 'Overview' : 'Management'}
                </div>
              )}
              
              <div className="space-y-1">
                {navItems
                  .filter(item => item.section === section)
                  .map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group hover:bg-primary hover:text-primary-foreground",
                        isActiveLink(item.path) 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-primary/90"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        collapsed ? "mx-auto" : "mr-3"
                      )} />
                      
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                      
                      {!collapsed && isActiveLink(item.path) && (
                        <ChevronRight className="h-4 w-4 opacity-70" />
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pb-4 pt-2 px-3">
        {!collapsed ? (
          <div className="flex items-center justify-between p-3 rounded-md bg-accent/80">
            <div className="flex items-center gap-x-2">
              <div className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-primary">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                </span>
              </div>
              <span className="text-xs font-medium">3 notifications</span>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto w-10 h-8 flex items-center justify-center">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-primary">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
