
import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  Search,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  const [notifications] = useState([
    { id: 1, message: "New tenant registered", time: "Just now" },
    { id: 2, message: "Subscription payment received", time: "2 hours ago" },
    { id: 3, message: "System update completed", time: "Yesterday" }
  ]);

  return (
    <header 
      className={cn(
        "h-16 flex items-center justify-between border-b px-6 transition-all duration-300 ease-in-out bg-white shadow-sm",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}
    >
      <div className="flex items-center gap-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="hover:bg-accent"
        >
          {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
        
        <div className="relative max-w-md w-80 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input 
            type="search" 
            placeholder="Search..." 
            className="w-full py-2 pl-10 pr-4 text-sm bg-secondary/10 border border-border rounded-md focus-visible:ring-1 focus-visible:ring-primary focus:border-primary outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-x-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-accent"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-0">
            <div className="p-4 border-b">
              <h3 className="font-medium">Notifications</h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 hover:bg-muted/50 cursor-pointer border-b">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <Badge variant="outline" className="text-xs ml-2 bg-primary/10 hover:bg-primary/20 border-primary/20 text-primary">
                      {notification.time}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 text-center border-t">
              <Button variant="ghost" size="sm" className="text-xs w-full text-muted-foreground hover:text-foreground">
                View all notifications
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-x-2 hover:bg-accent group"
            >
              <Avatar className="h-8 w-8 border-2 border-transparent group-hover:border-primary transition-colors">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground ml-0 md:ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
