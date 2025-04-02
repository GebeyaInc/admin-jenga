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
  Globe,
  MapPin,
  Users,
  ShoppingBag,
  ChevronDown
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
import { useQuery } from '@tanstack/react-query';
import { fetchTenantAnalytics, fetchTenants } from '@/services/tenantService';
import { Skeleton } from '@/components/ui/skeleton';

const locationData = [
  { name: 'United States', value: 45 },
  { name: 'Europe', value: 25 },
  { name: 'Asia', value: 15 },
  { name: 'Canada', value: 10 },
  { name: 'Australia', value: 5 }
];

const engagementData = [
  { name: 'Jan', users: 1200, providers: 200 },
  { name: 'Feb', users: 1800, providers: 250 },
  { name: 'Mar', users: 2400, providers: 300 },
  { name: 'Apr', users: 2800, providers: 350 },
  { name: 'May', users: 3200, providers: 400 },
  { name: 'Jun', users: 3600, providers: 450 },
  { name: 'Jul', users: 4000, providers: 500 }
];

export const TenantInsights: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [displayLimit, setDisplayLimit] = useState(10);
  
  const { data: analyticsData, isLoading: isAnalyticsLoading } = useQuery({
    queryKey: ['tenantAnalytics'],
    queryFn: fetchTenantAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
  
  const { data: tenants = [], isLoading: isTenantsLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: fetchTenants,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
  
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tenant.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const displayedTenants = filteredTenants.slice(0, displayLimit);
  
  const handleViewMore = () => {
    setDisplayLimit(prev => prev + 10);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 border-green-500/30">{status}</Badge>;
      case 'trial':
        return <Badge className="bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 border-blue-500/30">{status}</Badge>;
      case 'expired':
      case 'inactive':
        return <Badge className="bg-red-500/20 text-red-700 hover:bg-red-500/30 border-red-500/30">{status}</Badge>;
      case 'onboarding':
        return <Badge className="bg-orange-500/20 text-orange-700 hover:bg-orange-500/30 border-orange-500/30">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Summary</h1>
          <p className="text-muted-foreground mt-1">Tenant engagement and marketplace insights (Latest First)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{analyticsData?.totalTenants || 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              12% increase from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Marketplaces</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{analyticsData?.activeMarketplaces || 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              8 new marketplaces this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Industry</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <div className="text-2xl font-bold">{analyticsData?.topIndustry.name || 'N/A'}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {isAnalyticsLoading ? (
                <Skeleton className="h-3 w-16" />
              ) : (
                `${analyticsData?.topIndustry.percentage || 0}% of all tenants`
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isAnalyticsLoading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <div className="text-2xl font-bold">{analyticsData?.topLocation.name || 'N/A'}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {isAnalyticsLoading ? (
                <Skeleton className="h-3 w-16" />
              ) : (
                `${analyticsData?.topLocation.percentage || 0}% of all tenants`
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart 
          title="Industry Distribution" 
          description="Breakdown by tenant industry"
          data={analyticsData?.industryDistribution && analyticsData.industryDistribution.length > 0 
            ? analyticsData.industryDistribution 
            : [{ name: 'No Data', value: 100 }]}
          type="pie"
          height={300}
        />
        <Chart 
          title="Geographic Distribution" 
          description="Tenant locations worldwide"
          data={locationData}
          type="bar"
          yKeys={['value']}
          height={300}
        />
      </div>
      
      <Chart 
        title="Platform Engagement" 
        description="Monthly active users and service providers"
        data={engagementData}
        type="line"
        yKeys={['users', 'providers']}
        height={300}
        className="mb-6"
      />
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tenants..." 
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
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
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
              <TableHead>Providers</TableHead>
              <TableHead>Active Since</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isTenantsLoading ? (
              Array(5).fill(0).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell>
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : displayedTenants.length > 0 ? (
              displayedTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tenant.name}</p>
                      <p className="text-sm text-muted-foreground">{tenant.industry} • {tenant.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell>{tenant.plan}</TableCell>
                  <TableCell>{tenant.providers}</TableCell>
                  <TableCell>{tenant.activeSince}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Analytics</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Contact Admin</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No tenants found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {filteredTenants.length > displayLimit && (
          <div className="flex justify-center py-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleViewMore}
              className="flex items-center gap-2"
            >
              View More <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
