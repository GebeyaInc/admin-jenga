
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { Loader2 } from 'lucide-react';

interface ReferralSourceData {
  source: string;
  count: number;
  color: string;
}

export const ReferralSources: React.FC = () => {
  const { data: referralData, isLoading, error } = useQuery({
    queryKey: ['referralSources'],
    queryFn: async () => {
      console.log('Fetching referral sources data');
      const { data, error } = await supabase
        .from('tenants')
        .select('referral_source, referral_source_other')
        .not('referral_source', 'is', null);

      if (error) {
        console.error('Error fetching referral sources:', error);
        throw error;
      }

      // Process and aggregate the data
      const sourceCounts: Record<string, number> = {};
      
      data.forEach(tenant => {
        const source = tenant.referral_source || 'Unknown';
        
        if (source === 'Other' && tenant.referral_source_other) {
          // For 'Other', use the specific value from referral_source_other
          const otherSource = tenant.referral_source_other;
          sourceCounts[otherSource] = (sourceCounts[otherSource] || 0) + 1;
        } else {
          // For standard categories
          sourceCounts[source] = (sourceCounts[source] || 0) + 1;
        }
      });

      // Define colors for the chart
      const colors = [
        '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', 
        '#00C49F', '#FFBB28', '#FF8042', '#a4de6c', '#d0ed57'
      ];

      // Convert to format needed for the pie chart
      const chartData: ReferralSourceData[] = Object.entries(sourceCounts)
        .map(([source, count], index) => ({
          source,
          count,
          color: colors[index % colors.length]
        }))
        .sort((a, b) => b.count - a.count);  // Sort by count descending

      console.log('Processed referral data:', chartData);
      return chartData;
    }
  });

  if (isLoading) {
    return (
      <Card className="col-span-full h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (error || !referralData) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Referral Sources</CardTitle>
          <CardDescription>How creators discovered our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Unable to load referral source data.</p>
        </CardContent>
      </Card>
    );
  }

  // If we have no data or all sources are null
  if (referralData.length === 0) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Referral Sources</CardTitle>
          <CardDescription>How creators discovered our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No referral source data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Referral Sources</CardTitle>
        <CardDescription>How creators discovered our platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={referralData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
                nameKey="source"
                label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`}
              >
                {referralData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [`${value} tenants`, props.payload.source]}
                labelFormatter={() => 'Referral Source'} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">Source Breakdown</h4>
          <div className="space-y-1">
            {referralData.map((item) => (
              <div key={item.source} className="flex justify-between text-sm">
                <span className="flex items-center">
                  <span 
                    className="inline-block w-3 h-3 mr-2 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.source}
                </span>
                <span className="font-medium">{item.count} tenants</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
