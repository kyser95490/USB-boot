
import React, { useState } from 'react';
import { 
  Usb, 
  HelpCircle, 
  ShieldCheck, 
  HardDrive, 
  Settings, 
  Terminal, 
  AlertCircle,
  Download,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import RufusTool from './components/RufusTool.tsx';
import AIAdvisor from './components/AIAdvisor.tsx';
import { CreationStatus } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tool' | 'ai' | 'guide'>('tool');
  const [creationStatus, setCreationStatus] = useState<CreationStatus>(CreationStatus.IDLE);

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900">
      {/* Top Navigation / Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Usb size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Win11 BootMaster</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <TabButton 
              active={activeTab === 'tool'} 
              onClick={() => setActiveTab('tool')}
              icon={<Settings size={18} />}
              label="Créateur USB"
            />
            <TabButton 
              active={activeTab === 'ai'} 
              onClick={() => setActiveTab('ai')}
              icon={<HelpCircle size={18} />}
              label="Aide IA"
            />
            <TabButton 
              active={activeTab === 'guide'} 
              onClick={() => setActiveTab('guide')}
              icon={<Info size={18} />}
              label="Guide Installation"
            />
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'tool' && (
              <RufusTool status={creationStatus} setStatus={setCreationStatus} />
            )}
            
            {activeTab === 'ai' && (
              <AIAdvisor />
            )}

            {activeTab === 'guide' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" />
                  Guide de création Windows 11
                </h2>
                <div className="space-y-8">
                  <Step 
                    number={1} 
                    title="Télécharger l'ISO Officiel" 
                    desc="Rendez-vous sur le site de Microsoft pour télécharger l'image disque (ISO) de Windows 11."
                    link="https://www.microsoft.com/software-download/windows11"
                  />
                  <Step 
                    number={2} 
                    title="Préparer une Clé USB" 
                    desc="Utilisez une clé d'au moins 8 Go. Attention : toutes les données seront effacées."
                  />
                  <Step 
                    number={3} 
                    title="Configurer le BootMaster" 
                    desc="Sélectionnez votre clé et le fichier ISO. Pour Windows 11, le schéma GPT est fortement recommandé."
                  />
                  <Step 
                    number={4} 
                    title="Démarrer l'ordinateur" 
                    desc="Redémarrez votre PC cible et appuyez sur la touche Boot Menu (souvent F12, F11, F8 ou ESC) pour choisir la clé USB."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Quick Status */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-500 uppercase text-xs tracking-wider mb-4">Statut Système</h3>
              <div className="space-y-4">
                <StatusItem 
                  icon={<ShieldCheck className="text-blue-500" />} 
                  label="TPM 2.0" 
                  value="Requis" 
                />
                <StatusItem 
                  icon={<HardDrive className="text-purple-500" />} 
                  label="Espace Libre" 
                  value="> 64 Go" 
                />
                <StatusItem 
                  icon={<Terminal className="text-slate-500" />} 
                  label="Boot Mode" 
                  value="UEFI (CSM Off)" 
                />
              </div>
            </div>

            <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
              <div className="flex items-start gap-4">
                <AlertCircle className="shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Besoin d'aide ?</h3>
                  <p className="text-blue-100 text-sm leading-relaxed mb-4">
                    Notre IA peut vous aider à configurer votre BIOS ou à comprendre pourquoi votre PC n'est pas compatible.
                  </p>
                  <button 
                    onClick={() => setActiveTab('ai')}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Demander à l'Assistant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-between z-50">
        <MobileTabButton active={activeTab === 'tool'} onClick={() => setActiveTab('tool')} icon={<Settings size={20} />} label="Outil" />
        <MobileTabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={<HelpCircle size={20} />} label="Aide IA" />
        <MobileTabButton active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon={<Info size={20} />} label="Guide" />
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    {icon}
    {label}
  </button>
);

const MobileTabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
      active ? 'text-blue-600' : 'text-slate-500'
    }`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const StatusItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
    <span className="text-sm font-bold text-slate-900">{value}</span>
  </div>
);

const Step: React.FC<{ number: number; title: string; desc: string; link?: string }> = ({ number, title, desc, link }) => (
  <div className="flex gap-6">
    <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-200">
      {number}
    </div>
    <div className="space-y-1">
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-2 hover:underline"
        >
          Télécharger ici <Download size={14} />
        </a>
      )}
    </div>
  </div>
);

export default App;
