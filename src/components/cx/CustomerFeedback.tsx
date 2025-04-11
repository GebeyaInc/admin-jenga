
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

// Mock data for customer feedback
const feedbackData = [
  { 
    id: 1, 
    customer: 'Alex Johnson', 
    date: '2024-04-08', 
    content: 'The platform is intuitive and easy to use. I especially love the analytics dashboard.', 
    rating: 5,
    source: 'app',
    sentiment: 'positive'
  },
  { 
    id: 2, 
    customer: 'Sarah Williams', 
    date: '2024-04-07', 
    content: 'Customer support was very responsive when I encountered a problem.',
    rating: 4,
    source: 'email',
    sentiment: 'positive'
  },
  { 
    id: 3, 
    customer: 'Michael Brown', 
    date: '2024-04-06', 
    content: 'Had some issues with generating reports. Would appreciate more documentation.',
    rating: 3,
    source: 'app',
    sentiment: 'neutral'
  },
  { 
    id: 4, 
    customer: 'Emily Davis', 
    date: '2024-04-05', 
    content: 'The recent update made the interface more confusing. Please consider reverting some changes.',
    rating: 2,
    source: 'survey',
    sentiment: 'negative'
  }
];

export const CustomerFeedback: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3/5</div>
            <p className="text-xs text-muted-foreground">
              From 127 ratings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
            <div className="flex space-x-1">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <ThumbsDown className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 h-2 rounded-full w-3/5"></div>
              <span className="text-xs text-green-600">60%</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <div className="bg-yellow-100 h-2 rounded-full w-1/4"></div>
              <span className="text-xs text-yellow-600">25%</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <div className="bg-red-100 h-2 rounded-full w-[15%]"></div>
              <span className="text-xs text-red-600">15%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Feedback Sources</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">In-app</span>
                <span className="text-xs font-medium">54%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Email</span>
                <span className="text-xs font-medium">32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs">Surveys</span>
                <span className="text-xs font-medium">14%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>
            Browse and manage customer feedback across all channels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="neutral">Neutral</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {feedbackData.map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{feedback.customer}</h3>
                          <Badge variant={
                            feedback.sentiment === 'positive' ? 'default' : 
                            feedback.sentiment === 'neutral' ? 'outline' : 'destructive'
                          }>
                            {feedback.sentiment}
                          </Badge>
                          <span className="text-xs text-muted-foreground">via {feedback.source}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill={i < feedback.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{feedback.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="positive" className="space-y-4">
              {feedbackData.filter(f => f.sentiment === 'positive').map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{feedback.customer}</h3>
                          <Badge>positive</Badge>
                          <span className="text-xs text-muted-foreground">via {feedback.source}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill={i < feedback.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{feedback.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="neutral" className="space-y-4">
              {feedbackData.filter(f => f.sentiment === 'neutral').map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{feedback.customer}</h3>
                          <Badge variant="outline">neutral</Badge>
                          <span className="text-xs text-muted-foreground">via {feedback.source}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill={i < feedback.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{feedback.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="negative" className="space-y-4">
              {feedbackData.filter(f => f.sentiment === 'negative').map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{feedback.customer}</h3>
                          <Badge variant="destructive">negative</Badge>
                          <span className="text-xs text-muted-foreground">via {feedback.source}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill={i < feedback.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{feedback.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
