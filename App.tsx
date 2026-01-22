
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
  Info,
  Package,
  ExternalLink,
  ChevronRight,
  Monitor
} from 'lucide-react';
import RufusTool from './components/RufusTool.tsx';
import AIAdvisor from './components/AIAdvisor.tsx';
import PortableGuide from './components/PortableGuide.tsx';
import { CreationStatus } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tool' | 'ai' | 'guide' | 'portable'>('tool');
  const [creationStatus, setCreationStatus] = useState<CreationStatus>(CreationStatus.IDLE);

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900 pb-20 md:pb-0">
      {/* Navigation Header Style Windows 11 */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-200">
              <Usb size={22} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight leading-tight">Win11 BootMaster</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Édition Portable v1.0</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <TabButton active={activeTab === 'tool'} onClick={() => setActiveTab('tool')} icon={<Settings size={16} />} label="Créateur" />
            <TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={<HelpCircle size={16} />} label="Aide IA" />
            <TabButton active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} icon={<Info size={16} />} label="Instructions" />
            <TabButton active={activeTab === 'portable'} onClick={() => setActiveTab('portable')} icon={<Package size={16} />} label="Version EXE" />
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
                  Guide d'Installation Windows 11
                </h2>
                <div className="space-y-8">
                  <Step number={1} title="Télécharger l'ISO Microsoft" desc="Utilisez l'image disque officielle pour garantir la sécurité et la stabilité." link="https://www.microsoft.com/software-download/windows11" />
                  <Step number={2} title="Préparer le Support" desc="Clé USB 8 Go minimum. Toutes les données seront supprimées." />
                  <Step number={3} title="Flashage" desc="Utilisez notre outil (onglet Créateur) pour flasher l'image en mode GPT / UEFI." />
                  <Step number={4} title="Démarrage BIOS" desc="Redémarrez, accédez au Boot Menu (F12/F11) et désactivez le CSM si nécessaire." />
                </div>
              </div>
            )}

            {activeTab === 'portable' && (
              <PortableGuide />
            )}
          </div>

          {/* Sidebar Status */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-500 uppercase text-[10px] tracking-widest mb-4">Diagnostic Système</h3>
              <div className="space-y-4">
                <StatusItem icon={<ShieldCheck className="text-blue-500" />} label="TPM 2.0" value="Requis" />
                <StatusItem icon={<HardDrive className="text-purple-500" />} label="Espace Disque" value="64 Go min." />
                <StatusItem icon={<Monitor className="text-slate-500" />} label="Secure Boot" value="Activé" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Package size={20} /> Version EXE ?
              </h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Voulez-vous transformer cet outil en application Windows (.exe) autonome pour l'utiliser sans navigateur ?
              </p>
              <button 
                onClick={() => setActiveTab('portable')}
                className="w-full bg-white text-blue-600 font-bold py-2 rounded-xl text-sm transition-transform hover:scale-[1.02]"
              >
                Voir comment faire
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-6 py-3 flex justify-between z-50">
        <MobileTabButton active={activeTab === 'tool'} onClick={() => setActiveTab('tool')} icon={<Settings size={20} />} label="Outil" />
        <MobileTabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={<HelpCircle size={20} />} label="Aide" />
        <MobileTabButton active={activeTab === 'portable'} onClick={() => setActiveTab('portable')} icon={<Package size={20} />} label="Portable" />
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      active ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {icon}
    {label}
  </button>
);

const MobileTabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

const StatusItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-slate-50">{icon}</div>
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
    <span className="text-sm font-bold">{value}</span>
  </div>
);

const Step: React.FC<{ number: number; title: string; desc: string; link?: string }> = ({ number, title, desc, link }) => (
  <div className="flex gap-4">
    <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
      {number}
    </div>
    <div className="space-y-1">
      <h4 className="font-bold text-slate-900 leading-none">{title}</h4>
      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 text-[10px] font-bold mt-1 hover:underline">
          LIEN OFFICIEL <ExternalLink size={10} />
        </a>
      )}
    </div>
  </div>
);

export default App;
