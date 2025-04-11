
import React from 'react';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Image, 
  Film, 
  Bookmark, 
  Copy,
  ExternalLink
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const MarketingAssets: React.FC = () => {
  // Asset categories
  const categories = [
    {
      title: 'Brand Guidelines',
      icon: <Bookmark className="h-5 w-5 text-blue-500" />,
      assets: [
        { name: 'Gebeya Jenga Brand Book', type: 'pdf', size: '3.2 MB', updated: 'Today' },
        { name: 'Logo Package (All Formats)', type: 'zip', size: '12.6 MB', updated: '3 days ago' },
        { name: 'Color Palette & Typography', type: 'pdf', size: '1.8 MB', updated: '1 week ago' }
      ]
    },
    {
      title: 'Marketing Materials',
      icon: <FileText className="h-5 w-5 text-indigo-500" />,
      assets: [
        { name: 'Product One-Pager', type: 'pdf', size: '1.1 MB', updated: '2 days ago' },
        { name: 'Customer Success Stories', type: 'docx', size: '2.3 MB', updated: '5 days ago' },
        { name: 'Feature Comparison Sheet', type: 'pdf', size: '0.9 MB', updated: '1 week ago' }
      ]
    },
    {
      title: 'Visual Assets',
      icon: <Image className="h-5 w-5 text-green-500" />,
      assets: [
        { name: 'Product Screenshots Pack', type: 'zip', size: '24.5 MB', updated: '3 days ago' },
        { name: 'Social Media Graphics', type: 'zip', size: '18.7 MB', updated: '1 week ago' },
        { name: 'Team Photos', type: 'zip', size: '32.1 MB', updated: '2 weeks ago' }
      ]
    },
    {
      title: 'Video Resources',
      icon: <Film className="h-5 w-5 text-red-500" />,
      assets: [
        { name: 'Platform Demo Video', type: 'mp4', size: '48.2 MB', updated: '5 days ago' },
        { name: 'Customer Testimonials', type: 'mp4', size: '36.5 MB', updated: '2 weeks ago' },
        { name: 'Feature Tutorials', type: 'zip', size: '120.8 MB', updated: '3 weeks ago' }
      ]
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-600" />;
      case 'zip': return <FileText className="h-4 w-4 text-yellow-600" />;
      case 'docx': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'mp4': return <Film className="h-4 w-4 text-purple-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Marketing Assets & Resources</h2>
        <Button>
          <span className="mr-2">Upload Asset</span>
          <span className="sr-only">Upload a new asset</span>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-accent/30 pb-3">
              <div className="flex items-center gap-2">
                {category.icon}
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul>
                {category.assets.map((asset, assetIndex) => (
                  <li key={assetIndex} className="px-4 py-3 border-b last:border-0">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {getFileIcon(asset.type)}
                        <div>
                          <p className="font-medium">{asset.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs px-1 py-0 h-auto">
                              {asset.type.toUpperCase()}
                            </Badge>
                            <span>{asset.size}</span>
                            <span>•</span>
                            <span>Updated {asset.updated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy link</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-end px-4 py-2 bg-accent/10">
              <Button variant="ghost" size="sm">
                <span className="mr-1">View All</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Useful Marketing Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Key Messaging</h3>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                <li>Gebeya Jenga connects talent with opportunity through an intuitive marketplace</li>
                <li>Our platform reduces the time-to-hire by 60% compared to traditional methods</li>
                <li>Rated #1 in customer satisfaction for professional service marketplaces</li>
                <li>Serving over 5,000 businesses and 20,000 service providers across Africa</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold">Target Audiences</h3>
              <div className="mt-2 grid md:grid-cols-2 gap-4">
                <div className="bg-accent/20 p-3 rounded-md">
                  <h4 className="font-medium">Service Providers</h4>
                  <ul className="mt-1 text-sm space-y-1 list-disc pl-5">
                    <li>Freelancers and independent professionals</li>
                    <li>Small agencies and service firms</li>
                    <li>Specialized technical experts</li>
                  </ul>
                </div>
                <div className="bg-accent/20 p-3 rounded-md">
                  <h4 className="font-medium">Businesses & Clients</h4>
                  <ul className="mt-1 text-sm space-y-1 list-disc pl-5">
                    <li>SMEs looking for on-demand talent</li>
                    <li>Tech startups needing specialized skills</li>
                    <li>Enterprise companies with project-based needs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
