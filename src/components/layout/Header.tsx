
import React from 'react';
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
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  return (
    <header 
      className={cn(
        "h-16 flex items-center justify-between border-b border-border px-6 transition-all duration-300 ease-in-out bg-card",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}
    >
      <div className="flex items-center gap-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="hover:bg-muted"
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
            className="w-full py-2 pl-10 pr-4 text-sm bg-muted/50 border-0 rounded-md focus-visible:ring-1 focus-visible:ring-primary outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-x-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              </span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Recent Notifications</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-x-2 p-2 rounded-md hover:bg-muted/50">
                  <Badge variant="secondary" className="mt-0.5">New</Badge>
                  <div>
                    <p className="text-sm">New tenant registered</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-x-2 p-2 rounded-md hover:bg-muted/50">
                  <Badge variant="outline" className="mt-0.5">Update</Badge>
                  <div>
                    <p className="text-sm">System update completed</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-x-2 hover:bg-muted"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
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
