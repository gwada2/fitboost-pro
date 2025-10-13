import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { AutoImportJob } from '@/contexts/AutoImportContext';

interface ScanHistoryItemProps {
  job: AutoImportJob;
}

export const ScanHistoryItem: React.FC<ScanHistoryItemProps> = ({ job }) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return 'Il y a 1 jour';
    return `Il y a ${diffDays} jours`;
  };

  const getStatusIcon = () => {
    switch (job.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBg = () => {
    switch (job.status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'running':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getStatusBg()}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">
              {formatTimeAgo(job.startedAt)}
            </span>
            <span className="text-sm text-gray-600">
              {job.productsImported} {job.productsImported > 1 ? 'produits importés' : 'produit importé'}
            </span>
          </div>
          
          <p className="text-sm text-gray-700 mb-2">
            Sources : {job.sources.join(' • ')}
          </p>
          
          {job.productsUpdated > 0 && (
            <p className="text-sm text-gray-600">
              💰 {job.productsUpdated} {job.productsUpdated > 1 ? 'prix mis à jour' : 'prix mis à jour'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
