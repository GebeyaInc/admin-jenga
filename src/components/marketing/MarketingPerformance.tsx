
import React from 'react';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';

export const MarketingPerformance: React.FC = () => {
  // Sample data for marketing performance
  const channelData = [
    { name: 'Organic Search', current: 4200, previous: 3800, change: 10.5 },
    { name: 'Direct', current: 3100, previous: 2900, change: 6.9 },
    { name: 'Social', current: 2800, previous: 2100, change: 33.3 },
    { name: 'Referral', current: 1900, previous: 2200, change: -13.6 },
    { name: 'Email', current: 1200, previous: 950, change: 26.3 }
  ];

  const conversionData = [
    { name: 'Home Page', views: 8500, signups: 320, rate: 3.8 },
    { name: 'Features Page', views: 4200, signups: 185, rate: 4.4 },
    { name: 'Pricing Page', views: 3600, signups: 210, rate: 5.8 },
    { name: 'Blog Post: "Top 10"', views: 2900, signups: 95, rate: 3.3 },
    { name: 'Case Study Page', views: 1800, signups: 128, rate: 7.1 }
  ];

  const timelineData = [
    { date: 'Jan', visitors: 4000, signups: 240 },
    { date: 'Feb', visitors: 3000, signups: 198 },
    { date: 'Mar', visitors: 5000, signups: 300 },
    { date: 'Apr', visitors: 6000, signups: 380 },
    { date: 'May', visitors: 4000, signups: 250 },
    { date: 'Jun', visitors: 5000, signups: 320 }
  ];

  // Metrics cards data
  const metrics = [
    { 
      title: 'Website Visitors', 
      value: '24,512', 
      change: 12.5, 
      trend: 'up',
      period: 'from last month' 
    },
    { 
      title: 'Conversion Rate', 
      value: '4.8%', 
      change: 0.6, 
      trend: 'up',
      period: 'from last month'  
    },
    { 
      title: 'Avg. Time on Site', 
      value: '3m 42s', 
      change: -8.3, 
      trend: 'down',
      period: 'from last month'  
    },
    { 
      title: 'Cost per Acquisition', 
      value: '$24.80', 
      change: -5.2, 
      trend: 'down',
      period: 'from last month'  
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Marketing Performance</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Report</Button>
          <Button variant="outline">Print</Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{metric.title}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Comparing current vs previous period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={channelData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="Current Period" fill="#8884d8" />
                  <Bar dataKey="previous" name="Previous Period" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Timeline</CardTitle>
            <CardDescription>Visitors and signups over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="visitors" 
                    name="Website Visitors"
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="signups" 
                    name="New Signups"
                    stroke="#82ca9d" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Data */}
      <Card>
        <CardHeader>
          <CardTitle>Page Performance & Conversion</CardTitle>
          <CardDescription>
            Top converting pages and their performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium py-2 px-4">Page</th>
                  <th className="text-right font-medium py-2 px-4">Page Views</th>
                  <th className="text-right font-medium py-2 px-4">Sign-ups</th>
                  <th className="text-right font-medium py-2 px-4">Conv. Rate</th>
                  <th className="text-right font-medium py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {conversionData.map((row, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3 px-4">{row.name}</td>
                    <td className="text-right py-3 px-4">{row.views.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{row.signups.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-medium ${
                        row.rate > 5 ? 'text-green-600' : row.rate < 4 ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {row.rate}%
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <span className="mr-1">Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing top 5 pages by conversion
          </div>
          <Button variant="outline" size="sm">View All Pages</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
