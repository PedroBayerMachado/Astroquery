import React, { useState, useMemo } from 'react';
import { GLOSSARY_ITEMS } from '../data/staticData';
import { GlossaryItem, Difficulty } from '../types';
import { Search, Layers, X, BookOpen, Lightbulb, HelpCircle, GraduationCap } from 'lucide-react';

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Todos');

  // Compute available categories dynamically
  const categories = useMemo(() => {
    const list = GLOSSARY_ITEMS.map(item => item.category);
    return ['Todos', ...Array.from(new Set(list))];
  }, []);

  // Filter glossary list
  const filteredItems = useMemo(() => {
    return GLOSSARY_ITEMS.filter(item => {
      const matchSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchDifficulty = selectedDifficulty === 'Todos' || item.difficulty === selectedDifficulty;

      return matchSearch && matchCategory && matchDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Intro Header */}
      <div id="glossary-header" className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest font-mono">Dicionário Técnico</span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-zinc-900 dark:text-zinc-50">Biblioteca de Termos Essenciais</h1>
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-4xl">
          Navegue pelas terminologias vitais de Analytics, Modelagem e Estatística. Use os filtros rápidos para restringir sua busca ou digite o termo desejado diretamente na barra de pesquisa.
        </p>

        {/* Search & Filtration Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 items-center">
          
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 bg-transparent text-zinc-400" />
            <input
              id="search-glossary-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar termo ex: 'Overfitting', 'Lambda'..."
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-150 rounded-xl text-sm border border-zinc-200 dark:border-zinc-850 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-zinc-300 transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty filter selection */}
          <div className="md:col-span-3">
            <select
              id="select-difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm border border-zinc-200 dark:border-zinc-850 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer font-sans"
            >
              <option value="Todos">Nível: Todos</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>

          {/* Clear Button */}
          <div className="md:col-span-3 flex justify-end">
            {(searchQuery || selectedCategory !== 'Todos' || selectedDifficulty !== 'Todos') && (
              <button
                id="btn-reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setSelectedDifficulty('Todos');
                }}
                className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-600 dark:text-zinc-300 font-semibold rounded-xl text-xs transition-all cursor-pointer text-center font-display uppercase tracking-wide"
              >
                Limpar Todos Filtros
              </button>
            )}
          </div>
        </div>

        {/* Categories Horizontal Pills Bar */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase mr-2 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Categoria:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-pill-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-155' 
                  : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results layout */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                id={`glossary-card-${item.id}`}
                className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-850 shadow-sm hover:shadow-md hover:border-purple-250 dark:hover:border-zinc-800 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-semibold tracking-wider uppercase rounded">
                      {item.category}
                    </span>
                    
                    <span className={`text-[10px] font-semibold tracking-wider uppercase font-mono px-2 py-0.5 rounded ${
                      item.difficulty === 'Iniciante'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                        : item.difficulty === 'Intermediário'
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
                          : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {item.term}
                  </h3>
                  
                  <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed font-sans">
                    {item.definition}
                  </p>
                </div>

                {/* Example practical section */}
                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-display">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    Exemplo Prático / Caso de Uso
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-850 font-mono">
                    {item.example}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 space-y-3">
          <HelpCircle className="w-12 h-12 text-zinc-300 mx-auto" />
          <h4 className="text-lg font-bold font-display text-zinc-800 dark:text-zinc-300">Nenhum termo localizado</h4>
          <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
            Nenhum conceito correspondeu aos filtros selecionados ou string de busca. Experimente redefinir os filtros ou buscar por palavras-chave mais genéricas.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
              setSelectedDifficulty('Todos');
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-lg transition-all cursor-pointer"
          >
            Redefinir Filtros
          </button>
        </div>
      )}

    </div>
  );
}
