import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AutoImportJob } from '@/contexts/AutoImportContext';

interface ScanProgressProps {
  job: AutoImportJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScanProgress: React.FC<ScanProgressProps> = ({ job, isOpen, onClose }) => {
  if (!job) return null;

  const progress = job.status === 'completed' ? 100 : 
                   job.status === 'running' ? Math.min(90, (job.productsFound / 50) * 100) : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {job.status === 'running' && <Loader2 className="w-6 h-6 animate-spin text-blue-600" />}
            {job.status === 'completed' && '✅'}
            {job.status === 'running' ? '🔄 Scan en cours...' : '✅ Scan terminé !'}
          </h2>
          {job.status === 'completed' && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-600 to-secondary-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{job.productsFound}</div>
            <div className="text-sm text-gray-600">Trouvés</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{job.productsImported}</div>
            <div className="text-sm text-gray-600">Importés</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{job.productsUpdated}</div>
            <div className="text-sm text-gray-600">Mis à jour</div>
          </div>
        </div>

        {/* Current Source */}
        {job.status === 'running' && job.sources.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Sources scannées :</p>
            <p className="font-semibold text-gray-900">{job.sources.join(', ')}</p>
          </div>
        )}

        {/* Logs */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">📋 Activité</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
            {job.logs.slice(-10).reverse().map((log, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 text-sm ${
                  log.type === 'success' ? 'text-green-700' :
                  log.type === 'error' ? 'text-red-700' :
                  'text-gray-700'
                }`}
              >
                <span className="flex-shrink-0">•</span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {job.status === 'running' && (
            <Button variant="outline" onClick={onClose}>
              Continuer en arrière-plan
            </Button>
          )}
          {job.status === 'completed' && (
            <Button onClick={onClose}>
              Fermer
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
