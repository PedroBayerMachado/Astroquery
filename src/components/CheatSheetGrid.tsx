import React, { useState } from 'react';
import { CHEATSHEET_ITEMS } from '../data/staticData';
import { ChevronRight, Copy, Check, FileCode, Terminal, HelpCircle } from 'lucide-react';

export default function CheatSheetGrid() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeLanguageFilter, setActiveLanguageFilter] = useState<'all' | 'python' | 'sql'>('all');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredItems = CHEATSHEET_ITEMS.filter(item => {
    if (activeLanguageFilter === 'all') return true;
    return item.language === activeLanguageFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div id="cheatsheet-header" className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Guias de Consulta Rápida</span>
              <h1 className="text-2xl md:text-3xl font-extrabold font-display text-zinc-900 dark:text-zinc-50">Sintaxes & "Cheat Sheets"</h1>
            </div>
          </div>

          {/* Quick Language filters */}
          <div className="flex gap-1 bg-zinc-150 dark:bg-zinc-800/80 p-1 rounded-lg">
            <button
              id="filter-lang-all"
              onClick={() => setActiveLanguageFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold font-display transition-all cursor-pointer ${
                activeLanguageFilter === 'all'
                  ? 'bg-white dark:bg-zinc-700 shadow text-indigo-700 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Exibir Todos
            </button>
            <button
              id="filter-lang-py"
              onClick={() => setActiveLanguageFilter('python')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold font-display transition-all cursor-pointer ${
                activeLanguageFilter === 'python'
                  ? 'bg-white dark:bg-zinc-700 shadow text-indigo-700 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Apenas Python
            </button>
            <button
              id="filter-lang-sql"
              onClick={() => setActiveLanguageFilter('sql')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold font-display transition-all cursor-pointer ${
                activeLanguageFilter === 'sql'
                  ? 'bg-white dark:bg-zinc-700 shadow text-indigo-700 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Apenas SQL
            </button>
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-4xl">
          Coleção compacta de snippets estruturados e consagrados. Copie o código imediatamente com o botão de área de transferência rápida e cole em seus notebooks locais do Jupyter, Google Colab ou console de SQL de produção.
        </p>
      </div>

      {/* Code Blocks list */}
      <div className="space-y-8">
        {filteredItems.map((item) => {
          const lines = item.code.split('\n');
          return (
            <div
              key={item.id}
              id={`cheatsheet-block-${item.id}`}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden"
            >
              {/* Card Meta Header */}
              <div className="px-6 py-4 border-b border-zinc-150 dark:border-zinc-800/80 flex items-center justify-between flex-wrap gap-3 bg-zinc-50/50 dark:bg-zinc-950/20">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{item.category}</span>
                  <h3 className="font-extrabold font-display text-zinc-900 dark:text-zinc-50 text-base">{item.title}</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                    item.language === 'python' 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30' 
                      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30'
                  }`}>
                    {item.language}
                  </span>
                  
                  <button
                    id={`btn-copy-${item.id}`}
                    onClick={() => handleCopy(item.id, item.code)}
                    className="p-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 rounded-lg hover:shadow-sm border border-indigo-100 dark:border-indigo-900/40 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 text-[11px]">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Brief Explanation */}
              <div className="px-6 py-4 bg-zinc-50/20 dark:bg-zinc-900 text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed italic border-b border-zinc-100 dark:border-zinc-800">
                {item.explanation}
              </div>

              {/* Code Editor Style View */}
              <div className="flex bg-[#0f172a] text-slate-100 font-mono text-xs overflow-hidden leading-relaxed">
                
                {/* Simulated line numbering */}
                <div className="select-none py-4 px-3 text-right bg-slate-950 text-slate-600 border-r border-slate-800 w-10 shrink-0 text-[10px]">
                  {lines.map((_, idx) => (
                    <div key={idx} className="h-5">{idx + 1}</div>
                  ))}
                </div>

                {/* Simulated code container */}
                <div className="py-4 px-5 overflow-x-auto flex-1 h-full scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                  <pre className="text-left text-slate-200 font-mono select-all text-xs tracking-wide">
                    {lines.map((line, idx) => {
                      // Ultra-light dynamic client-side styling representation for visual realism
                      let lineClass = "text-slate-300";
                      if (line.trim().startsWith('#') || line.trim().startsWith('--')) {
                        lineClass = "text-slate-500 italic"; // Comments
                      } else if (line.includes('import ') || line.includes('from ') || line.includes('def ') || line.includes('return ') || line.includes('class ') || line.includes('for ') || line.includes('if ') || line.includes('as ') || line.includes('lambda ')) {
                        lineClass = "text-pink-400"; // Python keywords
                      } else if (line.includes('SELECT ') || line.includes('FROM ') || line.includes('WHERE ') || line.includes('GROUP BY ') || line.includes('INNER JOIN ') || line.includes('ORDER BY ')) {
                        lineClass = "text-yellow-400 font-semibold"; // SQL keywords
                      } else if (line.includes('pd.DataFrame') || line.includes('np.select') || line.includes('sns.') || line.includes('plt.')) {
                        lineClass = "text-emerald-400"; // Library calls
                      }
                      
                      return (
                        <div key={idx} className={`h-5 whitespace-pre ${lineClass}`}>
                          {line || ' '}
                        </div>
                      );
                    })}
                  </pre>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
