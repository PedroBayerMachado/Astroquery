import React, { useState } from 'react';
import { EXERCISES_LIST, PROJECT_IDEAS, RANDOM_CHALLENGES, USEFUL_LINKS } from '../data/staticData';
import { RandomChallenge } from '../types';
import { HelpCircle, ExternalLink, Lightbulb, Shuffle, ClipboardList, Folders, Anchor, Bookmark, HeartHandshake, Check } from 'lucide-react';

interface ChallengesModuleProps {
  completedExercises: string[];
  completeExercise: (id: string) => void;
}

export default function ChallengesModule({ completedExercises, completeExercise }: ChallengesModuleProps) {
  const theoreticalExercises = EXERCISES_LIST.filter(ex => ex.type === 'teorico');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [activeSubTab, setActiveSubTab] = useState<'teoricos' | 'projetos' | 'random' | 'links'>('teoricos');
  
  // Random challenge state
  const [currentRandomChallenge, setCurrentRandomChallenge] = useState<RandomChallenge | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const toggleSolution = (id: string) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const spinRandomChallenge = () => {
    setIsSpinning(true);
    setCurrentRandomChallenge(null);
    
    setTimeout(() => {
      const idx = Math.floor(Math.random() * RANDOM_CHALLENGES.length);
      setCurrentRandomChallenge(RANDOM_CHALLENGES[idx]);
      setIsSpinning(false);
    }, 750);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Visual Navigation Subtabs */}
      <div className="flex border-b border-zinc-150 dark:border-zinc-800 overflow-x-auto scroller-none py-1 gap-2">
        <button
          id="tab-challenges-teoricos"
          onClick={() => setActiveSubTab('teoricos')}
          className={`px-5 py-3 border-b-2 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'teoricos'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Exercícios Teóricos
        </button>
        <button
          id="tab-challenges-projetos"
          onClick={() => setActiveSubTab('projetos')}
          className={`px-5 py-3 border-b-2 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'projetos'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <Folders className="w-4 h-4" />
          Projetos de Portfólio
        </button>
        <button
          id="tab-challenges-random"
          onClick={() => setActiveSubTab('random')}
          className={`px-5 py-3 border-b-2 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'random'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          Gerador de Desafios
        </button>
        <button
          id="tab-challenges-links"
          onClick={() => setActiveSubTab('links')}
          className={`px-5 py-3 border-b-2 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'links'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <Anchor className="w-4 h-4" />
          Links Úteis & Datasets
        </button>
      </div>

      {/* Subtab Contents */}
      
      {/* SUBTAB 1: Theoretical Challenges */}
      {activeSubTab === 'teoricos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850">
            <h3 className="font-extrabold font-display text-base text-zinc-800 dark:text-zinc-200">Perguntas Estatísticas & Conceituais</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mt-1">
              Desafie seu pensamento crítico! Reflita e responda as questões antes de clicar para verificar a solução estruturada.
            </p>
          </div>

          <div className="space-y-6">
            {theoreticalExercises.map((ex) => {
              const isExpanded = !!expandedSolutions[ex.id];
              const isMarkedDone = completedExercises.includes(ex.id);
              return (
                <div 
                  key={ex.id}
                  id={`theoretical-challenge-${ex.id}`}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-850 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">{ex.category} — {ex.difficulty}</span>
                      <h4 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 font-display">{ex.title}</h4>
                    </div>
                    
                    <button
                      id={`btn-complete-ex-${ex.id}`}
                      onClick={() => {
                        completeExercise(ex.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isMarkedDone
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-650'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {isMarkedDone ? 'Resolvido!' : 'Marcar Concluído'}
                    </button>
                  </div>

                  <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">
                    {ex.question}
                  </p>

                  <div className="pt-2">
                    <button
                      id={`btn-toggle-solution-${ex.id}`}
                      onClick={() => toggleSolution(ex.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      {isExpanded ? 'Ocultar Resolução Explicativa' : 'Ver Resolução Explicativa Gabarito'}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-purple-100/60 dark:border-zinc-850/80 animate-fade-in text-xs font-sans leading-relaxed text-zinc-650 dark:text-zinc-450 space-y-3">
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide text-[10px] font-mono text-purple-600">Solução Oficial:</p>
                        <p className="whitespace-pre-line">{ex.solution}</p>
                        
                        <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg text-[11px] border border-dashed border-zinc-200 text-zinc-500">
                          <strong>Dica Conceitual:</strong> {ex.hint}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: Portfolio Projects Showcase */}
      {activeSubTab === 'projetos' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850">
            <h3 className="font-extrabold font-display text-base text-zinc-800 dark:text-zinc-200">Propostas de Projetos para Github/Portfólio</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mt-1">
              Desenvolva estes projetos práticos individualmente para impressionar recrutadores. Cada proposta possui objetivos e passos claros estruturados em ordem lógica.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROJECT_IDEAS.map((proj) => (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-850 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      proj.difficulty === 'Iniciante' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' :
                      proj.difficulty === 'Intermediário' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20' :
                      'bg-red-50 text-red-600 dark:bg-red-950/20'
                    }`}>
                      {proj.difficulty}
                    </span>
                    <h4 className="text-base font-extrabold font-display text-zinc-900 dark:text-zinc-50 leading-snug pt-1">{proj.title}</h4>
                  </div>

                  <p className="text-zinc-550 dark:text-zinc-400 text-xs leading-relaxed">
                    <strong className="text-zinc-700 dark:text-zinc-300 font-semibold block mb-0.5">Objetivo principal:</strong>
                    {proj.objective}
                  </p>

                  <div className="space-y-2">
                    <strong className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Passo a Passo Sugerido:</strong>
                    <ol className="list-decimal list-inside text-[11px] text-zinc-500 space-y-1 pl-1 leading-relaxed">
                      {proj.steps.map((st, i) => (
                        <li key={i} className="line-clamp-2 hover:line-clamp-none transition-all">{st}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                  <div className="text-[11px] font-sans">
                    <span className="text-zinc-400">Dataset recomendado: </span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{proj.datasetName}</span>
                  </div>
                  
                  <a
                    id={`link-dataset-${proj.id}`}
                    href={proj.datasetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
                  >
                    Obter Dados no Kaggle
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Random challenge builder spinner */}
      {activeSubTab === 'random' && (
        <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm text-center space-y-6">
          <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-purple-600">
            <Shuffle className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-50">Gerador de Desafios Aleatórios (Estudo Dirigido)</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
              Está sem criatividade para simular algo novo hoje? Sorteie um desafio de escopo rápido e execute localmente para forçar seu aprendizado estatístico.
            </p>
          </div>

          <button
            id="btn-trigger-spin"
            onClick={spinRandomChallenge}
            disabled={isSpinning}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm rounded-xl cursor-pointer hover:shadow-lg shadow-purple-200 dark:shadow-none hover:opacity-95 active:scale-98 transition-all flex items-center gap-2 mx-auto"
          >
            {isSpinning ? 'Sorteando Alvo...' : 'Sortear Desafio de Análise'}
          </button>

          {currentRandomChallenge && (
            <div id="random-challenge-reveal" className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-dashed border-purple-250 text-left space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">Ideia Sorteada</span>
                <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">{currentRandomChallenge.difficulty}</span>
              </div>

              <h4 className="text-base font-extrabold font-display text-zinc-900 dark:text-zinc-100">{currentRandomChallenge.title}</h4>
              
              <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <strong className="text-zinc-800 dark:text-zinc-200">Objetivo: </strong>
                {currentRandomChallenge.target}
              </p>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide block">Roteiro Sugerido:</span>
                <ol className="list-decimal list-inside text-[11px] text-zinc-500 space-y-1">
                  {currentRandomChallenge.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg text-[10.5px] border border-zinc-100 dark:border-zinc-850">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Dataset para Simulação:</span> {currentRandomChallenge.suggestedDataset}
              </div>
            </div>
          )}

        </div>
      )}

      {/* SUBTAB 4: Useful curated links */}
      {activeSubTab === 'links' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850">
            <h3 className="font-extrabold font-display text-base text-zinc-800 dark:text-zinc-200">Diretório de Links, Bibliotecas & Datasets gratuitos</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mt-1">
              Curadoria de acessos recomendados pela equipe Astroquery. Salve nos favoritos para acelerar seus desenvolvimentos locais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USEFUL_LINKS.map((link, idx) => (
              <a
                key={idx}
                id={`useful-link-${idx}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-50 dark:border-zinc-850 shadow-sm hover:shadow-md hover:border-purple-250 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-bold tracking-wider font-mono uppercase px-2 py-0.5 rounded ${
                      link.category === 'Documentação' 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/20' 
                        : link.category === 'Datasets' 
                          ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/20' 
                          : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                    }`}>
                      {link.category}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-300 group-hover:text-purple-600 transition-colors" />
                  </div>

                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-display">
                    {link.title}
                  </h4>

                  <p className="text-zinc-500 text-xs leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
