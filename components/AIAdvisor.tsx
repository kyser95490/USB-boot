
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { getAIResponse } from '../services/geminiService.ts';
import { Message } from '../types.ts';

const AIAdvisor: React.FC = () => {
  const [history, setHistory] = useState<Message[]>([
    { role: 'model', text: "Bonjour ! Je suis votre expert Windows 11. Comment puis-je vous aider pour votre installation ou la création de votre clé USB ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getAIResponse([...history, userMessage]);
    
    setHistory(prev => [...prev, { role: 'model', text: response || "" }]);
    setIsLoading(false);
  };

  const suggestions = [
    "Pourquoi GPT plutôt que MBR ?",
    "Comment activer le TPM 2.0 ?",
    "Erreur 'Windows cannot be installed to this disk'",
    "Configuration BIOS pour booter sur USB"
  ];

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* AI Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
            <Sparkles size={20} className="text-blue-400" />
          </div>
          <div>
            <h2 className="font-bold text-sm">Assistant BootMaster</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Expert IA Actif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {history.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 p-4 rounded-2xl flex gap-2">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestions Tray */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-2">
          {suggestions.map(s => (
            <button 
              key={s}
              onClick={() => setInput(s)}
              className="text-xs bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="relative group">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question (ex: Comment régler le BIOS ?)"
            className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-300 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
          <AlertCircle size={10} /> Les réponses de l'IA sont à titre indicatif. Vérifiez toujours la documentation officielle.
        </p>
      </form>
    </div>
  );
};

export default AIAdvisor;
