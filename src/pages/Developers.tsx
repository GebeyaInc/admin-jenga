
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Developers: React.FC = () => {
  const apiKey = "sk_test_developer_key_12345"; // This would come from your backend in a real app
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "API key copied",
        description: "The API key has been copied to your clipboard."
      });
    });
  };

  const regenerateKey = () => {
    // In a real app, this would call an API to regenerate the key
    toast({
      title: "API key regenerated",
      description: "A new API key has been generated. Make sure to update your applications."
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">API & Developers</h1>
          <Button variant="outline">API Documentation</Button>
        </div>
        
        <Tabs defaultValue="keys" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keys">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage your API keys for integration with other services
                    </CardDescription>
                  </div>
                  <Button onClick={regenerateKey} variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Secret Key</h3>
                      <Badge variant="outline">Production</Badge>
                    </div>
                    <div className="flex items-center">
                      <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-sm flex-1 overflow-x-auto">
                        {apiKey}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(apiKey)}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      This key has access to all API endpoints. Keep it secret and never expose it in client-side code.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">Publishable Key</h3>
                      <Badge variant="outline">Client-side</Badge>
                    </div>
                    <div className="flex items-center">
                      <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-sm flex-1 overflow-x-auto">
                        pk_test_developer_key_67890
                      </code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard("pk_test_developer_key_67890")}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      This key can be used in public websites and applications. It has limited access to API endpoints.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="endpoints">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  Available API endpoints for your integration needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Badge className="mr-2 bg-green-500">GET</Badge>
                      <span className="font-mono text-sm">/api/v1/tenants</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Retrieve a list of all tenants associated with your account.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Badge className="mr-2 bg-blue-500">POST</Badge>
                      <span className="font-mono text-sm">/api/v1/tenants</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Create a new tenant with the provided information.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Badge className="mr-2 bg-yellow-500">PUT</Badge>
                      <span className="font-mono text-sm">/api/v1/tenants/:id</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Update an existing tenant with the provided ID.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Badge className="mr-2 bg-red-500">DELETE</Badge>
                      <span className="font-mono text-sm">/api/v1/tenants/:id</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Delete a tenant with the provided ID.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>
                      Configure webhooks to receive real-time updates
                    </CardDescription>
                  </div>
                  <Button variant="outline">Add Webhook</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 text-center py-8">
                  <p className="text-muted-foreground">
                    No webhooks configured yet. Add a webhook to receive real-time notifications when events occur.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Developers;
