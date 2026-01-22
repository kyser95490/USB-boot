
import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  FileArchive, 
  Database, 
  Cpu, 
  RefreshCcw,
  Play,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { CreationStatus, ToolSettings } from '../types.ts';

interface Props {
  status: CreationStatus;
  setStatus: (status: CreationStatus) => void;
}

const RufusTool: React.FC<Props> = ({ status, setStatus }) => {
  const [progress, setProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [availableDrives, setAvailableDrives] = useState([
    { id: 'usb-1', name: 'USB Flash Drive (Kingston) - 32GB', type: 'Removable' },
    { id: 'usb-2', name: 'External SSD (Samsung T7) - 500GB', type: 'SSD' }
  ]);
  
  const [settings, setSettings] = useState<ToolSettings>({
    driveId: 'usb-1',
    isoPath: '',
    partitionScheme: 'GPT',
    targetSystem: 'UEFI',
    fileSystem: 'NTFS'
  });

  const handleRefresh = () => {
    if (status !== CreationStatus.IDLE) return;
    
    setIsRefreshing(true);
    // Simulation d'une détection matérielle (1.5 seconde)
    setTimeout(() => {
      // On simule l'apparition d'une nouvelle clé si elle n'y est pas déjà
      setAvailableDrives(prev => {
        if (prev.length < 3) {
          return [
            ...prev,
            { id: 'usb-3', name: 'SanDisk Ultra Luxe - 64GB (Nouveau)', type: 'Removable' }
          ];
        }
        return prev;
      });
      setIsRefreshing(false);
    }, 1500);
  };

  const handleStart = () => {
    if (!settings.isoPath) {
      alert("Veuillez d'abord sélectionner un fichier ISO.");
      return;
    }
    
    if (window.confirm("AVERTISSEMENT : Toutes les données sur la clé seront effacées. Continuer ?")) {
      simulateCreation();
    }
  };

  const simulateCreation = () => {
    setStatus(CreationStatus.PREPARING);
    setProgress(0);

    const stages = [
      { status: CreationStatus.FORMATTING, start: 5 },
      { status: CreationStatus.COPYING, start: 25 },
      { status: CreationStatus.FINALIZING, start: 90 }
    ];
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus(CreationStatus.COMPLETED);
          return 100;
        }

        const newProgress = prev + 1;
        
        const stage = stages.find(s => newProgress >= s.start);
        if (stage && stage.status !== status) {
          setStatus(stage.status);
        }

        return newProgress;
      });
    }, 150);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h2 className="font-bold flex items-center gap-2 text-slate-800">
          <Monitor size={20} className="text-blue-600" />
          Configurateur de Support
        </h2>
        {status !== CreationStatus.IDLE && status !== CreationStatus.COMPLETED && (
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded animate-pulse">
            OPÉRATION EN COURS
          </span>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Drive Selection */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Database size={16} /> Périphérique cible
            </label>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing || status !== CreationStatus.IDLE}
              className={`text-blue-600 hover:text-blue-700 p-1 rounded-md hover:bg-blue-50 transition-colors disabled:opacity-30 flex items-center gap-1.5 text-xs font-bold`}
              title="Actualiser la liste des lecteurs"
            >
              {isRefreshing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCcw size={14} />
              )}
              {isRefreshing ? "RECHERCHE..." : "ACTUALISER"}
            </button>
          </div>
          <select 
            disabled={status !== CreationStatus.IDLE || isRefreshing}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
            value={settings.driveId}
            onChange={(e) => setSettings({...settings, driveId: e.target.value})}
          >
            {availableDrives.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* ISO Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <FileArchive size={16} /> Image ISO Windows 11
          </label>
          <div className="flex gap-2">
            <input 
              type="text"
              readOnly
              placeholder="Sélectionnez un fichier .iso"
              value={settings.isoPath}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none text-sm"
            />
            <label className="cursor-pointer bg-white border border-slate-300 hover:border-slate-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Parcourir
              <input 
                type="file" 
                accept=".iso" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSettings({...settings, isoPath: file.name});
                }}
                disabled={status !== CreationStatus.IDLE}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Cpu size={16} /> Schéma de partition
            </label>
            <select 
              disabled={status !== CreationStatus.IDLE}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
              value={settings.partitionScheme}
              onChange={(e) => setSettings({...settings, partitionScheme: e.target.value as 'GPT' | 'MBR'})}
            >
              <option value="GPT">GPT (Recommandé)</option>
              <option value="MBR">MBR (Anciens PC)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Monitor size={16} /> Système de destination
            </label>
            <select 
              disabled={status !== CreationStatus.IDLE}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
              value={settings.targetSystem}
              onChange={(e) => setSettings({...settings, targetSystem: e.target.value as 'UEFI' | 'BIOS'})}
            >
              <option value="UEFI">UEFI (non CSM)</option>
              <option value="BIOS">BIOS (ou UEFI-CSM)</option>
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        {status !== CreationStatus.IDLE && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Étape actuelle</span>
                <p className="text-sm font-medium text-slate-800">
                  {status === CreationStatus.PREPARING && "Préparation des fichiers..."}
                  {status === CreationStatus.FORMATTING && "Formatage de la clé (FAT32)..."}
                  {status === CreationStatus.COPYING && `Copie des fichiers ISO (${progress}%)...`}
                  {status === CreationStatus.FINALIZING && "Finalisation du secteur de boot..."}
                  {status === CreationStatus.COMPLETED && "Opération réussie !"}
                </p>
              </div>
              <span className="text-sm font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-blue-600 transition-all duration-300 ease-out ${status === CreationStatus.COMPLETED ? 'bg-green-500' : ''}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Completion Message */}
        {status === CreationStatus.COMPLETED && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="text-green-500 shrink-0" />
            <p className="text-sm text-green-800 font-medium">
              Votre clé USB Windows 11 est prête ! Vous pouvez maintenant redémarrer votre PC et démarrer (boot) sur la clé.
            </p>
          </div>
        )}

        {/* Warning Message */}
        {status === CreationStatus.IDLE && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="text-amber-500 shrink-0" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Note de sécurité :</strong> En environnement réel, l'écriture directe sur un périphérique USB nécessite des droits administrateur. Cette application simule le processus pour vous montrer les bonnes étapes.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 flex gap-4">
          {status === CreationStatus.IDLE ? (
            <button 
              onClick={handleStart}
              disabled={isRefreshing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Play size={18} fill="currentColor" />
              DÉMARRER LA CRÉATION
            </button>
          ) : (
            <button 
              onClick={() => {
                setStatus(CreationStatus.IDLE);
                setProgress(0);
              }}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              RECOMMENCER
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RufusTool;
