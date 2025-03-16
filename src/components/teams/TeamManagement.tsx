
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { PlusCircle, Mail, UserPlus, MoreHorizontal, Shield, ShieldCheck, ShieldX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'Admin', 
    status: 'Active',
    lastActive: '5 mins ago'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'Manager', 
    status: 'Active',
    lastActive: '1 hour ago'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert.johnson@example.com', 
    role: 'Developer', 
    status: 'Active',
    lastActive: '3 hours ago'
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily.davis@example.com', 
    role: 'Customer Success', 
    status: 'Invited',
    lastActive: '-'
  },
  { 
    id: 5, 
    name: 'Michael Wilson', 
    email: 'michael.wilson@example.com', 
    role: 'Manager', 
    status: 'Active',
    lastActive: '2 days ago'
  }
];

export const TeamManagement: React.FC = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            {role}
          </Badge>
        );
      case 'Manager':
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            {role}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-secondary text-secondary-foreground flex items-center gap-1">
            <ShieldX className="h-3 w-3" />
            {role}
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm">{status}</span>
          </div>
        );
      case 'Invited':
        return (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            <span className="text-sm">{status}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-gray-300"></div>
            <span className="text-sm">{status}</span>
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage users and their access permissions</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Invite Member</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team. They'll receive an email with a link to accept.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="colleague@example.com"
                  type="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="cs">Customer Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Input
                  id="message"
                  placeholder="Looking forward to working with you!"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
              <Button 
                className="gap-2" 
                onClick={() => {
                  // Handle invite logic
                  setIsInviteDialogOpen(false);
                }}
              >
                <Mail className="h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(member.role)}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell>{member.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      {member.status === 'Invited' && (
                        <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Remove User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
