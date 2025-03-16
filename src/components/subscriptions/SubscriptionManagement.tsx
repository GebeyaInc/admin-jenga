
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

  // Fetch subscription data from Supabase
  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      // Fetch subscriptions
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('subscriptions')
        .select('*');
      
      if (subscriptionsError) {
        throw new Error(subscriptionsError.message);
      }

      // Fetch tenants to get company names
      const { data: tenantsData, error: tenantsError } = await supabase
        .from('tenants')
        .select('id, company_name');
      
      if (tenantsError) {
        throw new Error(tenantsError.message);
      }

      // Map tenants to a dictionary for quick lookup
      const tenantMap = tenantsData.reduce((acc, tenant) => {
        acc[tenant.id] = tenant.company_name;
        return acc;
      }, {} as Record<string, string>);

      // Transform subscription data for display
      const transformedData: SubscriptionWithTenant[] = subscriptionsData.map((sub: Subscription) => {
        // Determine billing cycle based on start and end date
        const startDate = new Date(sub.start_date);
        const endDate = new Date(sub.end_date);
        const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                          endDate.getMonth() - startDate.getMonth();
        
        let billingCycle = 'Monthly';
        if (diffMonths >= 12) {
          billingCycle = 'Annual';
        } else if (diffMonths === 0) {
          billingCycle = '-';
        }

        // Format next billing date
        const nextBillingDate = new Date(sub.end_date);
        const formattedDate = `${nextBillingDate.toLocaleString('default', { month: 'short' })} ${nextBillingDate.getDate()}, ${nextBillingDate.getFullYear()}`;

        return {
          id: sub.id,
          tenant_id: sub.tenant_id,
          tenant_name: tenantMap[sub.tenant_id] || 'Unknown Tenant',
          plan: `$${sub.price} ${sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)}`,
          price: sub.price,
          billing_cycle: billingCycle,
          next_billing: formattedDate,
          payment_method: sub.payment_method || '-',
          status: sub.status
        };
      });

      return transformedData;
    }
  });

  // Filter subscriptions based on active tab, search query, and status filter
  const filteredSubscriptions = subscriptions?.filter(sub => {
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
      <div className="bg-white rounded-md border">
        <div className="grid grid-cols-7 p-4 border-b font-medium">
          <div>Tenant</div>
          <div>Status</div>
          <div>Plan</div>
          <div>Billing Cycle</div>
          <div>Next Billing</div>
          <div>Payment Method</div>
          <div>Amount</div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid grid-cols-7 p-4 border-b">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        ))}
      </div>
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
    <div className="bg-white rounded-md border">
      <div className="grid grid-cols-7 p-4 border-b font-medium">
        <div>Tenant</div>
        <div>Status</div>
        <div>Plan</div>
        <div>Billing Cycle</div>
        <div>Next Billing</div>
        <div>Payment Method</div>
        <div className="flex justify-between items-center">
          <div>Amount</div>
          <div>Actions</div>
        </div>
      </div>
      
      {subscriptions.map((sub) => (
        <div key={sub.id} className="grid grid-cols-7 p-4 border-b hover:bg-muted/20">
          <div>{sub.tenant_name}</div>
          <div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              sub.status === 'active' ? 'bg-green-100 text-green-800' :
              sub.status === 'trial' ? 'bg-blue-100 text-blue-800' :
              sub.status === 'failed' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
            </span>
          </div>
          <div>{sub.plan}</div>
          <div>{sub.billing_cycle}</div>
          <div>{sub.next_billing}</div>
          <div>{sub.payment_method}</div>
          <div className="flex justify-between items-center">
            <div>${sub.price.toFixed(2)}</div>
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
          </div>
        </div>
      ))}
    </div>
  );
}
