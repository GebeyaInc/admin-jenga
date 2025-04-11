
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  TicketIcon, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';

// Mock data for support tickets
const ticketsData = [
  {
    id: 'TKT-1234',
    customer: 'David Wilson',
    subject: 'Cannot access analytics dashboard',
    status: 'open',
    priority: 'high',
    created: '2024-04-09T10:30:00',
    lastUpdated: '2024-04-10T09:15:00',
    assignee: 'John Smith'
  },
  {
    id: 'TKT-1235',
    customer: 'Lisa Chen',
    subject: 'Billing discrepancy on latest invoice',
    status: 'in-progress',
    priority: 'medium',
    created: '2024-04-08T14:22:00',
    lastUpdated: '2024-04-10T08:45:00',
    assignee: 'Emma Johnson'
  },
  {
    id: 'TKT-1236',
    customer: 'Robert Garcia',
    subject: 'Request for feature enhancement',
    status: 'on-hold',
    priority: 'low',
    created: '2024-04-07T09:15:00',
    lastUpdated: '2024-04-09T15:30:00',
    assignee: 'Unassigned'
  },
  {
    id: 'TKT-1237',
    customer: 'Michelle Lee',
    subject: 'Integration with third-party service not working',
    status: 'open',
    priority: 'critical',
    created: '2024-04-10T08:05:00',
    lastUpdated: '2024-04-10T08:05:00',
    assignee: 'Unassigned'
  },
  {
    id: 'TKT-1238',
    customer: 'James Taylor',
    subject: 'Password reset not working',
    status: 'resolved',
    priority: 'high',
    created: '2024-04-05T11:20:00',
    lastUpdated: '2024-04-08T16:45:00',
    assignee: 'John Smith'
  }
];

// Helper function to get status badge variant
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'open':
      return 'default';
    case 'in-progress':
      return 'secondary';
    case 'on-hold':
      return 'outline';
    case 'resolved':
      return 'success';
    default:
      return 'default';
  }
};

// Helper function to get priority badge variant
const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'destructive';
    case 'high':
      return 'destructive';
    case 'medium':
      return 'warning';
    case 'low':
      return 'secondary';
    default:
      return 'default';
  }
};

export const SupportTickets: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 high priority
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 hrs</div>
            <p className="text-xs text-muted-foreground">
              1.2 hrs for high priority
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Within SLA timeframe
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                View and manage customer support tickets
              </CardDescription>
            </div>
            <Button size="sm">
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketsData.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(ticket.status) as any}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadge(ticket.priority) as any} className="capitalize">
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">
                    {new Date(ticket.lastUpdated).toLocaleString()}
                  </TableCell>
                  <TableCell>{ticket.assignee}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
