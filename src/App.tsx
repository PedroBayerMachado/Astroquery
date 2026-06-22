import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Orbit, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Award, 
  Database, 
  BookOpen, 
  FileCode, 
  HelpCircle, 
  Sparkles, 
  Bookmark, 
  GraduationCap, 
  Play, 
  CheckCircle2,
  TrendingUp,
  Compass,
  Route
} from 'lucide-react';

import { LESSONS_LIST, EXERCISES_LIST } from './data/staticData';
import Dashboard from './components/Dashboard';
import SqlFundamentals from './components/SqlFundamentals';
import Glossary from './components/Glossary';
import CheatSheetGrid from './components/CheatSheetGrid';
import ChallengesModule from './components/ChallengesModule';
import RoadmapsModule from './components/RoadmapsModule';

type Tab = 'dashboard' | 'sql' | 'glossary' | 'cheat' | 'challenges' | 'roadmaps';

export default function App() {
  // Navigation layout
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // States with direct localstorage synchronization for reset overlays
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [showResetToast, setShowResetToast] = useState<boolean>(false);

  // States with direct localstorage synchronization
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('astroquery_completed_lessons');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [completedExercises, setCompletedExercises] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('astroquery_completed_exercises');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('astroquery_theme');
      if (stored) return stored === 'dark';
      return true; // Use elegant dark theme as default for modern technical feel!
    } catch {
      return true;
    }
  });

  // Dark/Light Mode toggle sync on DOM
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('astroquery_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('astroquery_theme', 'light');
    }
  }, [darkMode]);

  // Sync state data write on changes
  useEffect(() => {
    localStorage.setItem('astroquery_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('astroquery_completed_exercises', JSON.stringify(completedExercises));
  }, [completedExercises]);

  // Progress state calculators
  const totalLessonsCount = LESSONS_LIST.length;
  const totalExercisesCount = EXERCISES_LIST.length;
  const totalProgressItems = totalLessonsCount + totalExercisesCount;
  const completedProgressItems = completedLessons.length + completedExercises.length;
  const globalProgressPercent = totalProgressItems > 0 
    ? Math.round((completedProgressItems / totalProgressItems) * 100) 
    : 0;

  // Toggle helpers
  const toggleLesson = (id: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const completeExercise = (id: string) => {
    setCompletedExercises(prev => {
      if (prev.includes(id)) {
        return prev; // keep completed
      } else {
        return [...prev, id];
      }
    });
  };

  const resetAllProgress = () => {
    setIsResetModalOpen(true);
  };

  const confirmReset = () => {
    setCompletedLessons([]);
    setCompletedExercises([]);
    // Remove custom and pre-defined roadmap items to allow the user to full-reset everything
    localStorage.removeItem('astroquery_completed_ds_roadmap');
    localStorage.removeItem('astroquery_completed_da_roadmap');
    localStorage.removeItem('astroquery_custom_roadmap_tasks');
    
    // Broadcast storage event to sync other components
    window.dispatchEvent(new Event('storage'));
    
    setIsResetModalOpen(false);
    setShowResetToast(true);
    setTimeout(() => {
      setShowResetToast(false);
    }, 4000);
  };

  // Safe tab switcher helper
  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'dashboard', label: 'Trilha & Dashboard', icon: Compass, color: 'text-purple-500' },
    { id: 'sql', label: 'Fundamentos & Terminal SQL', icon: Database, color: 'text-blue-500' },
    { id: 'roadmaps', label: 'Planos & Roadmaps', icon: Route, color: 'text-emerald-500' },
    { id: 'glossary', label: 'Biblioteca de Termos', icon: BookOpen, color: 'text-violet-500' },
    { id: 'cheat', label: 'Cola de Códigos', icon: FileCode, color: 'text-indigo-500' },
    { id: 'challenges', label: 'Exercícios & Projetos', icon: HelpCircle, color: 'text-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-150 transition-colors duration-300 font-sans flex flex-col selection:bg-purple-500/30">
      
      {/* HEADER SECTION --- STICKY */}
      <header id="main-header" className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-250/50 dark:border-zinc-900/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          
          {/* Logo brand & custom insignia */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl shadow-md rotate-3 hover:rotate-0 transition-transform">
              <Orbit className="w-5 h-5 animate-pulse" />
            </div>
            
            <div className="flex flex-col justify-center select-none">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold font-display tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                  Astroquery
                </span>
                <span className="text-[9px] font-bold font-mono tracking-widest bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 px-1.5 py-0.5 rounded uppercase leading-none">
                  Beta v4
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium font-sans mt-0.5">Plataforma de Estudos Data Science</span>
            </div>
          </div>

          {/* Large desktop navigation status indicator */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Real-time Global Progress bar */}
            <div className="flex items-center gap-3 px-4 py-2 bg-zinc-100/50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/20">
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase block">Seu progresso</span>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-display">
                  {completedProgressItems} de {totalProgressItems} Metas
                </span>
              </div>
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                {/* SVG circular progress ring indicator */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    className="stroke-zinc-200 dark:stroke-zinc-800"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    className="stroke-purple-600 dark:stroke-purple-400 transition-all duration-500"
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 16}`}
                    strokeDashoffset={`${2 * Math.PI * 16 * (1 - globalProgressPercent / 100)}`}
                  />
                </svg>
                <span className="absolute text-[10px] font-bold font-mono text-purple-700 dark:text-purple-400">
                  {globalProgressPercent}%
                </span>
              </div>
            </div>

            {/* Dark/Light state toggle toggle */}
            <button
              id="theme-toggler-btn"
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-500 dark:text-zinc-400 rounded-xl cursor-pointer hover:shadow-sm border border-zinc-200/50 dark:border-zinc-800/30 transition-all shrink-0"
              title={darkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>

          {/* Mobile elements */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Circle Progress on Mobile */}
            <div className="p-2 bg-zinc-100 dark:bg-zinc-900 text-xs text-purple-600 dark:text-purple-400 font-semibold font-mono rounded-lg">
              {globalProgressPercent}%
            </div>

            {/* Dark toggler for mobile */}
            <button
              id="mobile-theme-toggler"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 rounded-lg cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Hamburger menu */}
            <button
              id="hamburger-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE DRAWER LAYOUT */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-b border-zinc-250 dark:border-zinc-900 overflow-hidden z-30"
          >
            <div className="px-4 py-6 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Navegação da Plataforma</span>
              <div className="grid grid-cols-1 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-btn-${item.id}`}
                      onClick={() => switchTab(item.id as Tab)}
                      className={`w-full p-3 rounded-xl text-left text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'text-zinc-600 dark:text-zinc-450 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <button
                  id="mobile-btn-reset"
                  onClick={resetAllProgress}
                  className="w-full p-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg text-center cursor-pointer transition-colors"
                >
                  Reiniciar Todo Progresso
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE FRAMEWORK BODY WRAPPER */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* DESKTOP SIDEBAR NAVIGATION */}
        <aside id="desktop-sidebar" className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="sticky top-26 space-y-6">
            
            <div className="p-4 bg-white dark:bg-zinc-900 border border-purple-50 dark:border-zinc-900 rounded-2xl shadow-sm">
              <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase px-3 mb-3">Estudo Dirigido</p>
              
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-btn-${item.id}`}
                      onClick={() => switchTab(item.id as Tab)}
                      className={`w-full px-3 py-3 rounded-xl text-left text-xs font-bold font-display tracking-wide flex items-center justify-between transition-all group cursor-pointer ${
                        isActive 
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 hover:text-zinc-950 dark:hover:text-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : item.color}`} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Local Progress Quick Meter bar in sidebar */}
            <div className="p-5 bg-gradient-to-br from-indigo-950 to-zinc-950 text-white rounded-2xl border border-indigo-900/40 space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Estatísticas Locais
                </span>
                <h4 className="font-extrabold text-sm font-display text-zinc-50">Sua Consistência</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-450 block font-light">Aulas Concluídas</span>
                  <span className="text-sm font-bold font-mono text-purple-300">{completedLessons.length}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-450 block font-light">Dificuldades Vencidas</span>
                  <span className="text-sm font-bold font-mono text-blue-300">{completedExercises.length}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-900/45 flex items-center justify-between gap-2">
                <span className="text-[9px] text-zinc-500 font-mono">Deseja reiniciar a jornada?</span>
                <button
                  id="btn-sidebar-reset"
                  onClick={resetAllProgress}
                  className="text-[10px] font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider font-display cursor-pointer"
                >
                  Resetar
                </button>
              </div>
            </div>

            {/* Minimal footer inside workspace */}
            <div className="px-4 text-[10px] text-zinc-400 dark:text-zinc-600 space-y-1">
              <p>© 2026 Astroquery. Todos os direitos reservados.</p>
              <p>Construído em conformidade estática total.</p>
            </div>

          </div>
        </aside>

        {/* ACTIVE MAIN RENDERING FRAMEWAY */}
        <main id="main-content-frame" className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full"
            >
              {activeTab === 'dashboard' && (
                <Dashboard 
                  completedLessons={completedLessons} 
                  toggleLesson={toggleLesson} 
                  setActiveTab={(tab) => switchTab(tab as Tab)}
                />
              )}

              {activeTab === 'sql' && (
                <SqlFundamentals 
                  completedExercises={completedExercises}
                  completeExercise={completeExercise}
                />
              )}

              {activeTab === 'glossary' && (
                <Glossary />
              )}

              {activeTab === 'cheat' && (
                <CheatSheetGrid />
              )}

              {activeTab === 'challenges' && (
                <ChallengesModule 
                  completedExercises={completedExercises}
                  completeExercise={completeExercise}
                />
              )}

              {activeTab === 'roadmaps' && (
                <RoadmapsModule />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

      {/* Toast Notification Alert (Reset Sucesso - Bypasses iframe alert blockage) */}
      <AnimatePresence>
        {showResetToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:border-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="p-1.5 bg-green-500 text-white rounded-lg">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">Jornada Resetada</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">Seu progresso de estudos foi reiniciado com sucesso.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal overlay (Bypasses iframe confirm blockage) */}
      <AnimatePresence>
        {isResetModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResetModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/50 dark:border-zinc-800 text-left shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl shrink-0">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-50 leading-tight">Reiniciar toda sua jornada?</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                    Isso apagará permanentemente todo o progresso de aulas concluídas, desafios de SQL vencidos e personalizações de roadmaps. Esta ação não poderá ser desfeita.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsResetModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 text-xs font-bold font-display hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmReset}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-display shadow-md shadow-red-500/10 transition-colors cursor-pointer"
                >
                  Confirmar Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
