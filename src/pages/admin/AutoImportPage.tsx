import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Settings, TrendingUp, Package, DollarSign, Clock, Zap } from 'lucide-react';
import { useAutoImport } from '@/contexts/AutoImportContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/admin/StatCard';
import { SourceCard } from '@/components/admin/SourceCard';
import { ScanProgress } from '@/components/admin/ScanProgress';
import { ScanHistoryItem } from '@/components/admin/ScanHistoryItem';

export const AutoImportPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    settings,
    currentJob,
    jobHistory,
    stats,
    isScanning,
    toggleAutoImport,
    setFrequency,
    toggleSource,
    setMaxProductsPerScan,
    runScanNow,
    getNextScanTime
  } = useAutoImport();

  const [showProgressModal, setShowProgressModal] = useState(false);
  const [countdown, setCountdown] = useState('');

  // Countdown jusqu'au prochain scan
  useEffect(() => {
    if (!settings.enabled) {
      setCountdown('Système désactivé');
      return;
    }

    const updateCountdown = () => {
      const next = getNextScanTime();
      const now = new Date();
      const diff = next.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('Scan imminent...');
        return;
      }

      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      
      if (hours > 0) {
        setCountdown(`dans ${hours}h ${minutes}min`);
      } else {
        setCountdown(`dans ${minutes} min`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, [settings.enabled, getNextScanTime]);

  // Ouvrir modal si scan en cours
  useEffect(() => {
    if (isScanning) {
      setShowProgressModal(true);
    }
  }, [isScanning]);

  const handleRunScanNow = async () => {
    setShowProgressModal(true);
    await runScanNow();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} minutes`;
    if (diffHours < 24) return `Il y a ${diffHours} heures`;
    return `Il y a ${Math.floor(diffHours / 24)} jours`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              🤖 Auto-Import Intelligent
            </h1>
            <p className="text-gray-600 text-lg">
              Importation automatique des meilleurs produits depuis Amazon, MyProtein et plus
            </p>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/admin/quick-import')}
            className="flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            ⚡ Import Rapide
          </Button>
        </div>

        {/* Quick Import Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">⚡ Import Manuel Rapide</h3>
              <p className="text-lg opacity-90">
                Ajoutez n'importe quel produit Amazon/MyProtein en 30 secondes chrono !
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/admin/quick-import')}
              className="shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Ajouter un produit →
            </Button>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold text-gray-900">Status</span>
                <Badge variant={settings.enabled ? 'success' : 'info'}>
                  {settings.enabled ? '✅ Actif' : '⏸️ Inactif'}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Prochain scan : <span className="font-semibold">{countdown}</span>
                </p>
                {stats.lastScanDate && (
                  <p className="flex items-center gap-2">
                    📅 Dernier scan : <span className="font-semibold">{formatTimeAgo(stats.lastScanDate)}</span>
                  </p>
                )}
              </div>
            </div>
            
            <Button
              variant={settings.enabled ? 'outline' : 'primary'}
              size="lg"
              onClick={() => toggleAutoImport(!settings.enabled)}
            >
              {settings.enabled ? '🔴 Désactiver' : '✅ Activer'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Package}
            value={stats.productsToday}
            label="Produits aujourd'hui"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={TrendingUp}
            value={stats.productsThisWeek}
            label="Produits cette semaine"
            iconColor="text-green-600"
            trend={{ value: '+18%', isPositive: true }}
          />
          <StatCard
            icon={Clock}
            value={stats.clicksThisWeek}
            label="Clics cette semaine"
            iconColor="text-purple-600"
          />
          <StatCard
            icon={DollarSign}
            value={`~${stats.estimatedRevenueWeek}€`}
            label="Commissions estimées"
            iconColor="text-orange-600"
            trend={{ value: '+15%', isPositive: true }}
          />
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            ⚙️ Paramètres
          </h2>

          {/* Frequency */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Fréquence de scan
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['1h', '6h', '12h', '24h'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    settings.frequency === freq
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  Toutes les {freq}
                  {freq === '24h' && (
                    <span className="block text-xs text-gray-500 mt-1">(recommandé)</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Max Products */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Produits maximum par scan : <span className="text-primary-600">{settings.maxProductsPerScan}</span>
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={settings.maxProductsPerScan}
              onChange={(e) => setMaxProductsPerScan(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>
        </div>

        {/* Sources Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🌐 Sources Actives
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settings.sources.map((source) => (
              <SourceCard
                key={source.id}
                source={source}
                onToggle={(enabled) => toggleSource(source.id, enabled)}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-8">
          <Button
            size="lg"
            onClick={handleRunScanNow}
            disabled={isScanning}
            className="text-xl py-6 px-12"
          >
            {isScanning ? (
              <>
                <Clock className="w-6 h-6 mr-2 animate-spin" />
                Scan en cours...
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-2" />
                ▶️ LANCER SCAN MAINTENANT
              </>
            )}
          </Button>
        </div>

        {/* History Section */}
        {jobHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              📜 Historique des scans ({jobHistory.length})
            </h2>
            
            <div className="space-y-4">
              {jobHistory.slice(0, 5).map((job) => (
                <ScanHistoryItem key={job.id} job={job} />
              ))}
            </div>

            {jobHistory.length > 5 && (
              <div className="text-center mt-6">
                <Button variant="outline">
                  Voir tout l'historique ({jobHistory.length})
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Modal */}
      <ScanProgress
        job={currentJob}
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
      />
    </div>
  );
};
