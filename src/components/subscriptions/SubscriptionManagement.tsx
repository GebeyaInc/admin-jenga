
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, Filter, MoreHorizontal, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Subscription type based on the Supabase table
type Subscription = {
  id: string;
  tenant_id: string;
  plan: string;
  price: number;
  start_date: string;
  end_date: string;
  status: string;
  payment_method: string | null;
};

// Tenant type for joining with subscription data
type Tenant = {
  id: string;
  company_name: string;
  subscription_plan: string;
  subscription_start_date: string;
  subscription_end_date: string;
  is_payment_overdue: boolean;
};

// Combined type for displaying in the table
type SubscriptionWithTenant = {
  id: string;
  tenant_id: string;
  tenant_name: string;
  plan: string;
  price: number;
  billing_cycle: string;
  next_billing: string;
  payment_method: string;
  status: string;
};

export const SubscriptionManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Fetch subscription and tenant data from Supabase
  const { data: subscriptionsData, isLoading } = useQuery({
    queryKey: ['subscriptions-with-tenants'],
    queryFn: async () => {
      // Fetch tenants with subscription details
      const { data: tenantsData, error: tenantsError } = await supabase
        .from('tenants')
        .select('id, company_name, subscription_plan, subscription_start_date, subscription_end_date, is_payment_overdue');
      
      if (tenantsError) {
        console.error('Error fetching tenants:', tenantsError);
        throw new Error(tenantsError.message);
      }

      // Fetch subscriptions if available
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*');
      
      if (subscriptionsError) {
        console.error('Error fetching subscriptions:', subscriptionsError);
        // Don't throw here, we'll use tenant data instead
      }

      // Transform tenant data for display
      const transformedData: SubscriptionWithTenant[] = tenantsData.map((tenant: Tenant) => {
        // Find matching subscription if it exists
        const matchingSubscription = subscriptionsData?.find(
          (sub: Subscription) => sub.tenant_id === tenant.id
        );

        // Use subscription data if available, otherwise use tenant data
        const plan = matchingSubscription?.plan || tenant.subscription_plan;
        const startDate = new Date(matchingSubscription?.start_date || tenant.subscription_start_date);
        const endDate = new Date(matchingSubscription?.end_date || tenant.subscription_end_date);
        
        // Determine price - use subscription price or default
        const price = matchingSubscription?.price || 
          (plan === 'basic' ? 19 : plan === 'premium' ? 49 : plan === 'enterprise' ? 99 : 0);

        // Determine billing cycle based on start and end date
        const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                          endDate.getMonth() - startDate.getMonth();
        
        let billingCycle = 'Monthly';
        if (diffMonths >= 12) {
          billingCycle = 'Annual';
        } else if (diffMonths === 0) {
          billingCycle = '-';
        }

        // Format next billing date
        const formattedDate = `${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getDate()}, ${endDate.getFullYear()}`;

        // Determine status
        const status = matchingSubscription?.status || 
          (tenant.is_payment_overdue ? 'failed' : 'active');

        return {
          id: matchingSubscription?.id || tenant.id,
          tenant_id: tenant.id,
          tenant_name: tenant.company_name,
          plan: `$${price} ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
          price: price,
          billing_cycle: billingCycle,
          next_billing: formattedDate,
          payment_method: matchingSubscription?.payment_method || 'Credit Card',
          status: status
        };
      });

      console.log('Transformed subscription data:', transformedData);
      return transformedData;
    }
  });

  // Filter subscriptions based on active tab, search query, and status filter
  const filteredSubscriptions = subscriptionsData?.filter(sub => {
    // Filter by tab
    if (activeTab === 'failed' && sub.status !== 'failed') return false;
    
    // Filter by search query
    if (searchQuery && !sub.tenant_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (statusFilter && sub.status !== statusFilter.toLowerCase()) return false;
    
    return true;
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Subscription Management</h1>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="all">All Subscriptions</TabsTrigger>
          <TabsTrigger value="failed">Failed Payments</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center justify-between my-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subscriptions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 border rounded-md">
              <Filter className="h-4 w-4" />
              <span>All Statuses</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Trial')}>
                Trial
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Failed')}>
                Failed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <TabsContent value="all" className="mt-0">
          {renderSubscriptionTable(filteredSubscriptions, isLoading)}
        </TabsContent>
        
        <TabsContent value="failed" className="mt-0">
          {renderSubscriptionTable(filteredSubscriptions, isLoading)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to render the subscription table
function renderSubscriptionTable(subscriptions: SubscriptionWithTenant[] | undefined, isLoading: boolean) {
  if (isLoading) {
    return (
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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-6 w-24" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              <TableCell><Skeleton className="h-6 w-20" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              <TableCell><Skeleton className="h-6 w-24" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              <TableCell><Skeleton className="h-6 w-6 rounded-full" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-md border p-8 text-center">
        <p className="text-muted-foreground">No subscription data found.</p>
      </div>
    );
  }

  return (
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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((sub) => (
          <TableRow key={sub.id} className="hover:bg-muted/20">
            <TableCell>{sub.tenant_name}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                sub.status === 'active' ? 'bg-green-100 text-green-800' :
                sub.status === 'trial' ? 'bg-blue-100 text-blue-800' :
                sub.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>{sub.plan}</TableCell>
            <TableCell>{sub.billing_cycle}</TableCell>
            <TableCell>{sub.next_billing}</TableCell>
            <TableCell>{sub.payment_method}</TableCell>
            <TableCell>${sub.price.toFixed(2)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Subscription</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Cancel Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
