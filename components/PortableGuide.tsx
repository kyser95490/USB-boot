
import React from 'react';
import { Package, Terminal, Download, Monitor, CheckCircle, Info, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';

const PortableGuide: React.FC = () => {
  const currentUrl = window.location.href;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <Package className="text-blue-400" />
          Créer un .EXE ou une App Native
        </h2>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          Puisque votre réseau bloque <code className="text-pink-400">npm</code>, utilisez ces méthodes alternatives sans installation.
        </p>
      </div>

      <div className="p-8 space-y-10">
        {/* Méthode 1: Edge App (Recommandé en entreprise) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Monitor size={18} className="text-blue-600" />
            <span>Méthode A : Installer via Microsoft Edge (Sans outil)</span>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl space-y-3">
            <p className="text-sm text-blue-900">
              C'est la méthode la plus fiable sur un PC de bureau restreint :
            </p>
            <ol className="text-xs text-blue-800 space-y-2 list-decimal list-inside">
              <li>Cliquez sur les <strong>trois points (...)</strong> en haut à droite d'Edge.</li>
              <li>Allez dans <strong>Applications</strong>.</li>
              <li>Cliquez sur <strong>Installer ce site en tant qu'application</strong>.</li>
              <li>Cochez <strong>"Créer un raccourci sur le Bureau"</strong>.</li>
            </ol>
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase mt-2">
              <CheckCircle size={12} /> Résultat : Un icône sur votre bureau qui lance l'outil comme un vrai logiciel.
            </div>
          </div>
        </section>

        {/* Méthode 2: Script PowerShell */}
        <section className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Cpu size={18} className="text-blue-600" />
            <span>Méthode B : Créer un lanceur PowerShell (.ps1)</span>
          </div>
          <p className="text-sm text-slate-600">
            Copiez ce script dans un fichier texte et nommez-le <code className="bg-slate-100 px-1 rounded">BootMaster.ps1</code>. Il lancera l'app dans une fenêtre dédiée sans barres de navigation.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-blue-300 relative group">
            <pre className="whitespace-pre-wrap">
{`$Url = "${currentUrl}"
$EdgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
Start-Process $EdgePath -ArgumentList "--app=$Url"`}
            </pre>
            <button 
              className="absolute top-3 right-3 text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-white"
              onClick={() => {
                navigator.clipboard.writeText(`$Url = "${currentUrl}"\n$EdgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"\nStart-Process $EdgePath -ArgumentList "--app=$Url"`);
                alert("Script PowerShell copié !");
              }}
            >
              COPIER LE SCRIPT
            </button>
          </div>
        </section>

        {/* Pourquoi l'erreur NPM ? */}
        <section className="bg-amber-50 p-5 rounded-xl border border-amber-100 flex gap-4">
          <ShieldAlert className="text-amber-500 shrink-0" size={24} />
          <div>
            <h4 className="font-bold text-amber-900 text-sm">Pourquoi l'erreur ECONNRESET ?</h4>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Votre ordinateur est derrière un <strong>Proxy</strong> ou un <strong>Pare-feu d'entreprise</strong> qui bloque les téléchargements depuis les registres NPM. Les méthodes ci-dessus utilisent les outils déjà présents sur votre système pour éviter ce blocage.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortableGuide;
