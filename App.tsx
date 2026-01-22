
import React, { useState } from 'react';
import { 
  Usb, 
  HelpCircle, 
  ShieldCheck, 
  HardDrive, 
  Settings, 
  Info,
  Package,
  Monitor,
  Layout
} from 'lucide-react';
import RufusTool from './components/RufusTool.tsx';
import AIAdvisor from './components/AIAdvisor.tsx';
import PortableGuide from './components/PortableGuide.tsx';
import { CreationStatus } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tool' | 'ai' | 'guide' | 'portable'>('tool');
  const [creationStatus, setCreationStatus] = useState<CreationStatus>(CreationStatus.IDLE);

  return (
    <div className="flex flex-col h-screen bg-[#f3f4f6] text-slate-900 overflow-hidden">
      {/* Header Windows Style */}
      <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded text-white">
            <Usb size={18} />
          </div>
          <span className="font-bold text-sm tracking-tight">Win11 BootMaster Portable</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-md transition-colors">
            <Settings size={16} className="text-slate-500" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-4 shrink-0">
          <nav className="space-y-1 flex-1">
            <SidebarButton 
              active={activeTab === 'tool'} 
              onClick={() => setActiveTab('tool')} 
              icon={<Layout size={18} />} 
              label="Créateur USB" 
            />
            <SidebarButton 
              active={activeTab === 'ai'} 
              onClick={() => setActiveTab('ai')} 
              icon={<HelpCircle size={18} />} 
              label="Assistant IA" 
            />
            <SidebarButton 
              active={activeTab === 'guide'} 
              onClick={() => setActiveTab('guide')} 
              icon={<Info size={18} />} 
              label="Instructions" 
            />
            <div className="pt-4 mt-4 border-t border-slate-200">
              <SidebarButton 
                active={activeTab === 'portable'} 
                onClick={() => setActiveTab('portable')} 
                icon={<Package size={18} />} 
                label="Exporter en .EXE" 
                highlight
              />
            </div>
          </nav>

          {/* System Mini Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">État Système</h4>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">TPM 2.0</span>
              <span className="text-green-600 font-bold">DÉTECTÉ</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Secure Boot</span>
              <span className="text-blue-600 font-bold">ACTIF</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-white m-4 rounded-2xl border border-slate-200 shadow-sm relative">
          <div className="p-8 max-w-4xl mx-auto">
            {activeTab === 'tool' && (
              <RufusTool status={creationStatus} setStatus={setCreationStatus} />
            )}
            
            {activeTab === 'ai' && (
              <AIAdvisor />
            )}

            {activeTab === 'guide' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Guide de préparation</h2>
                <p className="text-slate-500 text-sm">Suivez ces étapes pour réussir votre installation de Windows 11.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GuideCard title="ISO Officielle" desc="Téléchargez l'ISO 64-bit sur le site de Microsoft." step="01" />
                  <SidebarStatusCard icon={<Usb size={20}/>} title="Clé 8Go+" desc="Utilisez une clé vide (elle sera formatée)." />
                  <GuideCard title="Mode UEFI" desc="Assurez-vous que votre PC supporte le mode GPT/UEFI." step="02" />
                  <GuideCard title="Secure Boot" desc="Le Secure Boot doit être activé dans le BIOS." step="03" />
                </div>
              </div>
            )}

            {activeTab === 'portable' && (
              <PortableGuide />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; highlight?: boolean }> = ({ active, onClick, icon, label, highlight }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
        : highlight 
          ? 'text-blue-600 hover:bg-blue-50' 
          : 'text-slate-600 hover:bg-slate-200/50'
    }`}
  >
    {icon}
    {label}
  </button>
);

const GuideCard: React.FC<{ title: string; desc: string; step: string }> = ({ title, desc, step }) => (
  <div className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-colors">
    <span className="text-blue-600 font-bold text-xs">ÉTAPE {step}</span>
    <h3 className="font-bold text-slate-800 mt-1">{title}</h3>
    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{desc}</p>
  </div>
);

const SidebarStatusCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
    <div className="text-blue-600 mb-3">{icon}</div>
    <h3 className="font-bold text-slate-800">{title}</h3>
    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{desc}</p>
  </div>
);

export default App;
