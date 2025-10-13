import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { AutoImportSource } from '@/contexts/AutoImportContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface SourceCardProps {
  source: AutoImportSource;
  onToggle: (enabled: boolean) => void;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, onToggle }) => {
  const formatTimeAgo = (date: string | undefined) => {
    if (!date) return 'Jamais';
    
    const now = new Date();
    const scanDate = new Date(date);
    const diffMs = now.getTime() - scanDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  };

  return (
    <div className={`bg-white rounded-lg border-2 p-6 transition-all ${
      source.enabled ? 'border-primary-200 shadow-md' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`text-3xl ${source.enabled ? '' : 'opacity-50'}`}>
            {source.logo}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{source.name}</h3>
            <p className="text-sm text-gray-600">Top {source.topCount} {source.category}</p>
          </div>
        </div>
        
        {source.enabled && (
          <Badge variant="success">Actif</Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Importés</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {source.productsImported}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
            <Clock className="w-4 h-4" />
            <span>Dernier scan</span>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {formatTimeAgo(source.lastScan)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant={source.enabled ? 'outline' : 'primary'}
          size="sm"
          className="flex-1"
          onClick={() => onToggle(!source.enabled)}
        >
          {source.enabled ? 'Désactiver' : 'Activer'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled
        >
          Configurer
        </Button>
      </div>
    </div>
  );
};
