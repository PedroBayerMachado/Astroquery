import React from 'react';
import { LESSONS_LIST } from '../data/staticData';
import { LessonItem } from '../types';
import { Sparkles, Award, CheckCircle, Circle, BookOpen, GraduationCap, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  completedLessons: string[];
  toggleLesson: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ completedLessons, toggleLesson, setActiveTab }: DashboardProps) {
  const pythonLessons = LESSONS_LIST.filter(l => l.track === 'python');
  const sqlLessons = LESSONS_LIST.filter(l => l.track === 'sql');

  const totalLessonsCount = LESSONS_LIST.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  // Group lessons by category for better sectioning
  const groupByCategory = (lessons: LessonItem[]) => {
    return lessons.reduce((groups, lesson) => {
      const group = groups[lesson.category] || [];
      group.push(lesson);
      groups[lesson.category] = group;
      return groups;
    }, {} as Record<string, LessonItem[]>);
  };

  const pythonGroups = groupByCategory(pythonLessons);
  const sqlGroups = groupByCategory(sqlLessons);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div id="hero-banner" className="relative p-8 md:p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-700 to-blue-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="relative max-w-3xl z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider font-display border border-white/10 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            Workspace de Data Science
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            Domine a Ciência de Dados de ponta a ponta
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl font-light">
            Seja bem-vindo ao <span className="font-semibold text-white">Astroquery</span>. Sua central estática de aprendizagem acelerada com editor simulado de SQL, cheatsheets robustos de Python e glossários intuitivos.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              id="btn-goto-sql"
              onClick={() => setActiveTab('sql')}
              className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl text-sm shadow-md hover:bg-indigo-50 transition-all flex items-center gap-2 group cursor-pointer"
            >
              Praticar no Terminal SQL
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button 
              id="btn-goto-cheat"
              onClick={() => setActiveTab('cheat')}
              className="px-6 py-3 bg-indigo-800/40 text-indigo-50 border border-indigo-400/30 backdrop-blur-sm font-semibold rounded-xl text-sm hover:bg-indigo-800/60 transition-all cursor-pointer"
            >
              Ver "Cheat Sheets"
            </button>
          </div>
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div id="stat-progress-card" className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl text-purple-600 dark:text-purple-400">
            <Award className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Progresso Global</p>
            <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">{progressPercent}%</h3>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div id="stat-lessons-card" className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-blue-600 dark:text-blue-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Aulas Concluídas</p>
            <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">{completedCount} de {totalLessonsCount}</h3>
            <p className="text-xs text-zinc-500 mt-1">Status: {progressPercent === 100 ? 'Trilha Completa! 🎉' : 'Continuar Aprendizado'}</p>
          </div>
        </div>

        <div id="stat-time-card" className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Aulas Restantes</p>
            <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">{totalLessonsCount - completedCount}</h3>
            <p className="text-xs text-zinc-500 mt-1">Estudo Prático Autogerido</p>
          </div>
        </div>
      </div>

      {/* Roads / Trilhas Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Track 1: Python & Libraries */}
        <div id="track-python" className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Trilha Prática 1</span>
              <h2 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">Python & Bibliotecas</h2>
            </div>
            <div className="px-3.5 py-1.5 bg-purple-50 dark:bg-purple-950/50 rounded-lg text-purple-600 dark:text-purple-400 text-xs font-mono font-semibold">
              {pythonLessons.filter(l => completedLessons.includes(l.id)).length}/{pythonLessons.length} Aulas
            </div>
          </div>

          <div className="mt-8 space-y-8 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-100 dark:before:bg-zinc-800">
            {Object.entries(pythonGroups).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-9">
                  {category}
                </h4>
                
                <div className="space-y-4">
                  {items.map((lesson) => {
                    const isDone = completedLessons.includes(lesson.id);
                    return (
                      <div 
                        key={lesson.id}
                        id={`lesson-${lesson.id}`}
                        className={`group relative pl-9 p-4 rounded-xl border border-transparent hover:border-purple-100 dark:hover:border-zinc-850 hover:bg-purple-50/20 dark:hover:bg-zinc-950/30 transition-all ${
                          isDone ? 'bg-zinc-50/50 dark:bg-zinc-950/10' : ''
                        }`}
                      >
                        {/* Timeline Node Point Check Indicator */}
                        <button
                          onClick={() => toggleLesson(lesson.id)}
                          className="absolute left-3.5 top-5 -translate-x-1/2 p-0.5 rounded-full bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer text-zinc-300 dark:text-zinc-700 hover:text-purple-600 transition-colors z-10"
                        >
                          {isDone ? (
                            <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 fill-purple-100 dark:fill-transparent" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h5 className={`font-semibold text-sm ${isDone ? 'text-zinc-500 dark:text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>
                              {lesson.title}
                            </h5>
                            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                              {lesson.description}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                            {lesson.estimatedTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: SQL */}
        <div id="track-sql" className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Trilha Prática 2</span>
              <h2 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-50">Trilha de SQL Relacional</h2>
            </div>
            <div className="px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/50 rounded-lg text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold">
              {sqlLessons.filter(l => completedLessons.includes(l.id)).length}/{sqlLessons.length} Aulas
            </div>
          </div>

          <div className="mt-8 space-y-8 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-100 dark:before:bg-zinc-800">
            {Object.entries(sqlGroups).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-9">
                  {category}
                </h4>
                
                <div className="space-y-4">
                  {items.map((lesson) => {
                    const isDone = completedLessons.includes(lesson.id);
                    return (
                      <div 
                        key={lesson.id}
                        id={`lesson-${lesson.id}`}
                        className={`group relative pl-9 p-4 rounded-xl border border-transparent hover:border-blue-100 dark:hover:border-zinc-850 hover:bg-blue-50/20 dark:hover:bg-zinc-950/30 transition-all ${
                          isDone ? 'bg-zinc-50/50 dark:bg-zinc-950/10' : ''
                        }`}
                      >
                        {/* Timeline Node Point Check Indicator */}
                        <button
                          onClick={() => toggleLesson(lesson.id)}
                          className="absolute left-3.5 top-5 -translate-x-1/2 p-0.5 rounded-full bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-zinc-300 dark:text-zinc-700 hover:text-blue-600 transition-colors z-10"
                        >
                          {isDone ? (
                            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-100 dark:fill-transparent" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h5 className={`font-semibold text-sm ${isDone ? 'text-zinc-500 dark:text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-100'}`}>
                              {lesson.title}
                            </h5>
                            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                              {lesson.description}
                            </p>
                          </div>
                          <span className="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                            {lesson.estimatedTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
