
import React from 'react';
import { Package, Terminal, Download, Monitor, CheckCircle, Info } from 'lucide-react';

const PortableGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <Package className="text-blue-400" />
          Générer une version .EXE Portable
        </h2>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          Transformez cet outil web en une application Windows native que vous pouvez mettre sur une clé USB.
        </p>
      </div>

      <div className="p-8 space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Terminal size={18} className="text-blue-600" />
            <span>Option 1 : Méthode Rapide (Nativefier)</span>
          </div>
          <p className="text-sm text-slate-600">
            Nativefier permet d'encapsuler n'importe quelle URL dans un exécutable Windows autonome. 
            Il suffit d'avoir <span className="font-mono bg-slate-100 px-1 rounded text-red-500">Node.js</span> installé.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-blue-300 relative group">
            <code>npm install -g nativefier<br/>nativefier --name "Win11 BootMaster" --icon icon.ico "{window.location.origin}"</code>
            <button 
              className="absolute top-3 right-3 text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-white"
              onClick={() => {
                navigator.clipboard.writeText('npm install -g nativefier && nativefier --name "Win11 BootMaster" "' + window.location.origin + '"');
                alert("Commande copiée !");
              }}
            >
              COPIER
            </button>
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Download size={18} className="text-blue-600" />
            <span>Option 2 : Télécharger le Launcher (Simulation)</span>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-bold text-blue-900">BootMaster_Portable_v1.exe</h4>
              <p className="text-xs text-blue-700">Taille : 42 Mo | Signature : Microsoft-Verified Simulation</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 shrink-0">
              <Download size={18} />
              TÉLÉCHARGER
            </button>
          </div>
          <div className="flex items-start gap-2 text-[10px] text-slate-500 bg-slate-50 p-3 rounded-lg">
            <Info size={14} className="shrink-0" />
            <p>Note : Le bouton "Télécharger" ci-dessus simule le processus de packaging. Pour une vraie application, utilisez la méthode Terminal ou un outil comme Electron Forge.</p>
          </div>
        </section>

        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold flex items-center gap-2 text-slate-800">
            <Monitor size={18} /> Avantages de la version Portable
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BenefitItem text="Zéro installation requise" />
            <BenefitItem text="Utilisable hors-ligne (PWA)" />
            <BenefitItem text="Accès direct aux ports USB" />
            <BenefitItem text="Interface sans bordure" />
          </ul>
        </section>
      </div>
    </div>
  );
};

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center gap-2 text-sm text-slate-600">
    <CheckCircle size={14} className="text-green-500" />
    {text}
  </li>
);

export default PortableGuide;
