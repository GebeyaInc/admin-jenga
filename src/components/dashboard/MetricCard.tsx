
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive?: boolean;
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md metric-card border-transparent hover:border-muted",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trend && (
            <span 
              className={cn(
                "text-xs font-medium mr-2",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
          )}
          {description && (
            <CardDescription className="text-xs line-clamp-1">
              {description}
            </CardDescription>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
