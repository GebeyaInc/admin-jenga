
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Chart } from '@/components/dashboard/Chart';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const subscriptions = [
  {
    id: 1,
    tenant: 'TechCorp Inc.',
    status: 'Active',
    plan: '$100 Plan',
    billingCycle: 'Monthly',
    nextBilling: 'Aug 12, 2023',
    paymentMethod: 'M-Pesa',
    amount: '$100.00'
  },
  {
    id: 2,
    tenant: 'Health Plus LLC',
    status: 'Active',
    plan: '$80 Plan',
    billingCycle: 'Monthly',
    nextBilling: 'Aug 5, 2023',
    paymentMethod: 'Chapa',
    amount: '$80.00'
  },
  {
    id: 3,
    tenant: 'Global Services Co.',
    status: 'Trial',
    plan: 'Free Trial',
    billingCycle: '-',
    nextBilling: 'Aug 18, 2023',
    paymentMethod: '-',
    amount: '$0.00'
  },
  {
    id: 4,
    tenant: 'EduTech Solutions',
    status: 'Active',
    plan: '$50 Plan',
    billingCycle: 'Annual',
    nextBilling: 'Mar 30, 2024',
    paymentMethod: 'M-Pesa',
    amount: '$50.00'
  },
  {
    id: 5,
    tenant: 'Fashion Forward',
    status: 'Failed',
    plan: '$80 Plan',
    billingCycle: 'Monthly',
    nextBilling: 'Jul 8, 2023',
    paymentMethod: 'Chapa',
    amount: '$80.00'
  }
];

const revenueData = [
  { name: 'Jan', revenue: 5200 },
  { name: 'Feb', revenue: 7800 },
  { name: 'Mar', revenue: 9400 },
  { name: 'Apr', revenue: 12000 },
  { name: 'May', revenue: 14200 },
  { name: 'Jun', revenue: 16800 },
  { name: 'Jul', revenue: 19500 }
];

const subscriptionPlanData = [
  { name: 'Free Trial', value: 25 },
  { name: '$50 Plan', value: 35 },
  { name: '$80 Plan', value: 30 },
  { name: '$100 Plan', value: 10 }
];

const failedPayments = [
  {
    id: 1,
    tenant: 'Fashion Forward',
    date: 'Jul 8, 2023',
    amount: '$80.00',
    reason: 'Insufficient funds',
    attempts: 2
  },
  {
    id: 2,
    tenant: 'Tech Ventures',
    date: 'Jul 5, 2023',
    amount: '$100.00',
    reason: 'Payment method expired',
    attempts: 3
  },
  {
    id: 3,
    tenant: 'Health Partners',
    date: 'Jul 2, 2023',
    amount: '$50.00',
    reason: 'Transaction declined',
    attempts: 1
  }
];

export const SubscriptionManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscription.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 border-green-500/30">{status}</Badge>;
      case 'Trial':
        return <Badge className="bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 border-blue-500/30">{status}</Badge>;
      case 'Failed':
        return <Badge className="bg-red-500/20 text-red-700 hover:bg-red-500/30 border-red-500/30">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground mt-1">Manage tenant subscriptions and revenue</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$19,500</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">+16%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground mt-1">
              68% of all tenants
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Subscriptions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground mt-1">
              8 ending in the next 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500 font-medium">$230</span> in pending revenue
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart 
          title="Revenue Growth" 
          description="Monthly recurring revenue"
          data={revenueData}
          type="area"
          yKeys={['revenue']}
          height={300}
        />
        <Chart 
          title="Subscription Distribution" 
          description="Breakdown by pricing tier"
          data={subscriptionPlanData}
          type="pie"
          height={300}
        />
      </div>
      
      <Tabs defaultValue="subscriptions" className="mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="subscriptions">All Subscriptions</TabsTrigger>
          <TabsTrigger value="failed">Failed Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscriptions">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search subscriptions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div className="font-medium">{subscription.tenant}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                    <TableCell>{subscription.plan}</TableCell>
                    <TableCell>{subscription.billingCycle}</TableCell>
                    <TableCell>{subscription.nextBilling}</TableCell>
                    <TableCell>{subscription.paymentMethod}</TableCell>
                    <TableCell>{subscription.amount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Subscription</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Payment History</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="failed">
          <div className="bg-card rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Failed Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Retry Attempts</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {failedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="font-medium">{payment.tenant}</div>
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.reason}</TableCell>
                    <TableCell>{payment.attempts}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="mr-2">
                        Retry Payment
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Contact Tenant</DropdownMenuItem>
                          <DropdownMenuItem>Update Payment Method</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
