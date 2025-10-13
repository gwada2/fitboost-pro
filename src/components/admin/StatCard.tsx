import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  iconColor?: string;
  value: string | number;
  label: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  bgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  iconColor = 'text-primary-600',
  value,
  label,
  trend,
  bgColor = 'bg-white'
}) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 border border-gray-200`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${iconColor.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        {trend && (
          <span className={`text-sm font-semibold ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? '↗' : '↘'} {trend.value}
          </span>
        )}
      </div>
      
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {value}
      </div>
      
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
  );
};
