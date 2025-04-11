
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  SmileIcon,
  TrendingUpIcon,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock data for satisfaction metrics
const monthlyCSAT = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.3 },
  { month: 'Mar', score: 4.1 },
  { month: 'Apr', score: 4.4 },
  { month: 'May', score: 4.5 },
  { month: 'Jun', score: 4.6 },
  { month: 'Jul', score: 4.8 },
  { month: 'Aug', score: 4.7 },
  { month: 'Sep', score: 4.6 },
  { month: 'Oct', score: 4.8 },
  { month: 'Nov', score: 4.9 },
  { month: 'Dec', score: 4.8 }
];

const NPS = [
  { quarter: 'Q1', promoters: 68, passives: 20, detractors: 12 },
  { quarter: 'Q2', promoters: 70, passives: 19, detractors: 11 },
  { quarter: 'Q3', promoters: 74, passives: 17, detractors: 9 },
  { quarter: 'Q4', promoters: 78, passives: 15, detractors: 7 }
];

// Feedback channels data
const channelFeedback = [
  { channel: 'Web App', csat: 4.7, volume: 620 },
  { channel: 'Mobile App', csat: 4.5, volume: 540 },
  { channel: 'Email', csat: 4.3, volume: 320 },
  { channel: 'Phone', csat: 4.6, volume: 280 },
  { channel: 'Live Chat', csat: 4.8, volume: 410 }
];

export const CustomerSatisfaction: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CSAT Score</CardTitle>
            <SmileIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500 ml-1">+0.3 from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+71</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500 ml-1">+5 from Q3</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CES Score</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500 ml-1">+0.2 from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <div className="flex items-center mt-1">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-500 ml-1">-1% from last year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Satisfaction Trends</CardTitle>
          <CardDescription>
            Track CSAT, NPS, and other key metrics over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="csat" className="space-y-4">
            <TabsList>
              <TabsTrigger value="csat">CSAT Score</TabsTrigger>
              <TabsTrigger value="nps">NPS Score</TabsTrigger>
              <TabsTrigger value="channels">Feedback Channels</TabsTrigger>
            </TabsList>
            
            <TabsContent value="csat" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyCSAT}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      name="CSAT Score" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="nps" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={NPS}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="promoters" name="Promoters" stackId="a" fill="#36B37E" />
                    <Bar dataKey="passives" name="Passives" stackId="a" fill="#FFC400" />
                    <Bar dataKey="detractors" name="Detractors" stackId="a" fill="#FF5630" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="channels" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelFeedback}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="csat" name="CSAT Score" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="volume" name="Feedback Volume" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Data updated as of April 10, 2024
        </CardFooter>
      </Card>
    </div>
  );
};
