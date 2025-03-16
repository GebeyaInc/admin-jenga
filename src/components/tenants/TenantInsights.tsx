
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
  ShoppingBag
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

const tenants = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    industry: 'Technology',
    location: 'New York, USA',
    status: 'Active',
    plan: '$100 Plan',
    users: 250,
    providers: 45,
    marketplaces: 3,
    activeSince: 'Jan 12, 2023'
  },
  {
    id: 2,
    name: 'Health Plus LLC',
    industry: 'Healthcare',
    location: 'Boston, USA',
    status: 'Active',
    plan: '$80 Plan',
    users: 180,
    providers: 32,
    marketplaces: 2,
    activeSince: 'Mar 5, 2023'
  },
  {
    id: 3,
    name: 'Global Services Co.',
    industry: 'Professional Services',
    location: 'London, UK',
    status: 'Trial',
    plan: 'Free Trial',
    users: 75,
    providers: 12,
    marketplaces: 1,
    activeSince: 'Jun 18, 2023'
  },
  {
    id: 4,
    name: 'EduTech Solutions',
    industry: 'Education',
    location: 'Toronto, Canada',
    status: 'Active',
    plan: '$50 Plan',
    users: 120,
    providers: 22,
    marketplaces: 1,
    activeSince: 'Apr 30, 2023'
  },
  {
    id: 5,
    name: 'Fashion Forward',
    industry: 'Retail',
    location: 'Paris, France',
    status: 'Expired',
    plan: '$80 Plan',
    users: 95,
    providers: 18,
    marketplaces: 1,
    activeSince: 'Feb 8, 2023'
  }
];

const industryData = [
  { name: 'Technology', value: 35 },
  { name: 'Healthcare', value: 25 },
  { name: 'Education', value: 20 },
  { name: 'Professional Services', value: 15 },
  { name: 'Retail', value: 5 }
];

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
  
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tenant.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 border-green-500/30">{status}</Badge>;
      case 'Trial':
        return <Badge className="bg-blue-500/20 text-blue-700 hover:bg-blue-500/30 border-blue-500/30">{status}</Badge>;
      case 'Expired':
        return <Badge className="bg-red-500/20 text-red-700 hover:bg-red-500/30 border-red-500/30">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground mt-1">Tenant engagement and marketplace insights</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
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
            <div className="text-2xl font-bold">96</div>
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
            <div className="text-2xl font-bold">Technology</div>
            <p className="text-xs text-muted-foreground mt-1">
              35% of all tenants
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">United States</div>
            <p className="text-xs text-muted-foreground mt-1">
              45% of all tenants
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart 
          title="Industry Distribution" 
          description="Breakdown by tenant industry"
          data={industryData}
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
              <TableHead>Users</TableHead>
              <TableHead>Providers</TableHead>
              <TableHead>Active Since</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{tenant.name}</p>
                    <p className="text-sm text-muted-foreground">{tenant.industry} • {tenant.location}</p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                <TableCell>{tenant.plan}</TableCell>
                <TableCell>{tenant.users}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
