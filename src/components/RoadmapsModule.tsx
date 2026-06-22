import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Route, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ListPlus, 
  RotateCcw,
  BookOpen,
  TrendingUp,
  Map,
  BadgeAlert
} from 'lucide-react';

interface RoadmapTask {
  id: string;
  title: string;
  desc: string;
}

interface RoadmapPhase {
  title: string;
  tools: string[];
  tasks: RoadmapTask[];
}

interface CustomTask {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

const DATA_SCIENCE_ROADMAP: RoadmapPhase[] = [
  {
    title: "Fase 1: Fundamentos de Matemática e Estatística",
    tools: ["Álgebra Linear", "Cálculo", "Probabilidade", "Estatística Bayesiana"],
    tasks: [
      { id: "ds-1-1", title: "Álgebra Linear & Matrizes", desc: "Vetores, matrizes, operações com matrizes, autovetores e autovalores para entendimento de dimensionalidade." },
      { id: "ds-1-2", title: "Probabilidade e Estatística Descritiva", desc: "Distribuições normais, Teorema Central do Limite, testes de hipóteses (p-value, testes t, qui-quadrado)." },
      { id: "ds-1-3", title: "Cálculo para Machine Learning", desc: "Derivadas, gradiente descendente aplicados para otimização de funções de perda (loss functions)." }
    ]
  },
  {
    title: "Fase 2: Linguagem de Programação e manipulação de dados",
    tools: ["Python", "SQL", "Pandas", "NumPy"],
    tasks: [
      { id: "ds-2-1", title: "Python para Dados", desc: "Sintaxe, listas, dicionários, funções puras, manipulação de arquivos e conceitos de POO básicos." },
      { id: "ds-2-2", title: "Pandas e Manipulação de Dados", desc: "DataFrames, limpeza de NAs/outliers, agrupamentos (groupby), agregações e junções de tabelas." },
      { id: "ds-2-3", title: "Sintaxe SQL & Consultas Estruturadas", desc: "JOINS complexos, agregação, agrupamentos e o uso eficiente de índices e filtros." }
    ]
  },
  {
    title: "Fase 3: Análise Exploratória de Dados (EDA) e Storytelling",
    tools: ["Matplotlib", "Seaborn", "Storytelling", "EDA"],
    tasks: [
      { id: "ds-3-1", title: "Análise Exploratória Avançada", desc: "Identificar padrões ocultos, analisar correlações lineares/não lineares e gerar hipóteses robustas." },
      { id: "ds-3-2", title: "Design de Gráficos e Seaborn/Matplotlib", desc: "Plotar dispersões, histogramas, boxplots estruturados e configurar eixos informativos." },
      { id: "ds-3-3", title: "Storytelling com Dados", desc: "Aprenda a traduzir insights puramente estatísticos em apresentações focadas em valor de negócios." }
    ]
  },
  {
    title: "Fase 4: Machine Learning Tradicional",
    tools: ["Scikit-Learn", "Modelos Supervisionados", "Modelos Não Supervisionados"],
    tasks: [
      { id: "ds-4-1", title: "Conceitos de Aprendizado de Máquina", desc: "Supervisionado vs Não Supervisionado, Overfitting vs Underfitting, Divisão Treino/Validação/Teste e Validação Cruzada." },
      { id: "ds-4-2", title: "Modelos de Regressão & Classificação", desc: "Regressão Linear/Logística, Árvores de Decisão, Random Forests, XGBoost, Naive Bayes, K-Nearest Neighbors (KNN)." },
      { id: "ds-4-3", title: "Métricas de Avaliação de Modelos", desc: "Entendimento refinado de Acurácia, Precisão, Recall, F1-Score, Matriz de Confusão, ROC-AUC e MSE/MAE/R² para regressão." },
      { id: "ds-4-4", title: "Algoritmos não supervisionados", desc: "Clustering de dados com K-Means, DBSCAN e redução de dimensionalidade utilizando PCA." }
    ]
  },
  {
    title: "Fase 5: Deep Learning e Processamento Avançado",
    tools: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    tasks: [
      { id: "ds-5-1", title: "Fundamentos de Redes Neurais", desc: "Perceptron, funções de ativação (ReLU, Sigmoid, Softmax), retropropagação (backpropagation) e tensores." },
      { id: "ds-5-2", title: "Processamento de Linguagem Natural (NLP)", desc: "Tokenização, representações por vetores (Word Embeddings, TF-IDF) e introdução a Transformers básicos." },
      { id: "ds-5-3", title: "Conceitos de Visão Computacional", desc: "Entendimento sobre Redes Neurais Convolucionais (CNNs) e pré-processamento de dados de imagem." }
    ]
  },
  {
    title: "Fase 6: Prática de MLOps e Implantação",
    tools: ["Docker", "Git", "FastAPI", "HuggingFace"],
    tasks: [
      { id: "ds-6-1", title: "Versionamento com Git e GitHub", desc: "Gerenciar ramificações (branches), criar commits limpos, gerenciar repositórios para portfólio." },
      { id: "ds-6-2", title: "Desenvolvimento de APIs de Modelagem", desc: "Criar endpoints eficientes com FastAPI ou Flask para receber inputs de inferência e servir previsões." },
      { id: "ds-6-3", title: "Conteinerização com Docker", desc: "Empacotar os códigos e dependências do modelo em um container Docker isolado para fácil implantação." },
      { id: "ds-6-4", title: "Implantação em Nuvem (Cloud Deploy)", desc: "Hospedar o container ou a API de inferência de forma pública no Hugging Face Spaces, Render ou AWS." }
    ]
  }
];

const DATA_ANALYTICS_ROADMAP: RoadmapPhase[] = [
  {
    title: "Fase 1: Ferramentas de BI e Análise No-Code",
    tools: ["Excel", "Power BI", "Tableau", "DAX"],
    tasks: [
      { id: "da-1-1", title: "Excel Avançado para Negócios", desc: "Procuras dinâmicas (XLOOKUP/VLOOKUP), tabelas dinâmicas organizadas, macros básicas e formatações condicionais complexas." },
      { id: "da-1-2", title: "Power BI ou Tableau", desc: "Importação de dados (Power Query), modelagem de dados (star schema) e criação de relatórios altamente interativos." },
      { id: "da-1-3", title: "Modelagem e Linguagem DAX", desc: "Cálculos e colunas dinâmicas, medidas de tempo (Time Intelligence), inteligência analítica em escala de relatórios." }
    ]
  },
  {
    title: "Fase 2: Bancos de Dados e Linguagem SQL Analítica",
    tools: ["PostgreSQL", "MySQL", "DML", "Window Functions"],
    tasks: [
      { id: "da-2-1", title: "Sintaxe Essencial do SQL", desc: "SELECT com WHERE, JOINs essenciais (INNER, LEFT, RIGHT, FULL), GROUP BY com HAVING para agregação robusta." },
      { id: "da-2-2", title: "Window Functions e queries agregadas", desc: "RANK, DENSE_RANK, ROW_NUMBER, LEAD e LAG utilizadas em relatórios analíticos cronológicos." },
      { id: "da-2-3", title: "Modelagem de Tabelas Relacionais", desc: "Identificação de chaves primárias e estrangeiras, integridade de dados e normalização de tabelas (1NF, 2NF, 3NF)." }
    ]
  },
  {
    title: "Fase 3: Linguagens de Programação Científica para Análise",
    tools: ["Python", "Pandas", "Estatística Descritiva"],
    tasks: [
      { id: "da-3-1", title: "Fundamentos de Python", desc: "Sintaxe, listas, loops, dicionários e funções para agilizar tarefas e automatizar planilhas." },
      { id: "da-3-2", title: "Bibliotecas Analíticas (Pandas & NumPy)", desc: "Tratamento de dados estruturados com Pandas, conexões diretas a DBs via sqlalchemy e exportação rápida de relatórios." },
      { id: "da-3-3", title: "Estatística Geral e Descritiva", desc: "Cálculo de mediana, desvio padrão, média ponderada, variância, percentis aplicados no contexto de relatórios corporativos." }
    ]
  },
  {
    title: "Fase 4: Métricas de Negócio e Análise de Funil",
    tools: ["KPI's de Negócio", "Análise Cohort", "Analytics para Produto"],
    tasks: [
      { id: "da-4-1", title: "Métricas Organizacionais Cruciais", desc: "Mapeamento e cálculo de Churn, LTV (Lifetime Value), CAC (Custo de Aquisição de Cliente), ROI de campanhas e NPS." },
      { id: "da-4-2", title: "Análise Cohort & Retenção de Clientes", desc: "Estudo sistemático da consistência e frequência do uso/compra por coortes temporais de usuários." },
      { id: "da-4-3", title: "Mapeamento de Funil de Conversão", desc: "Identificação de gorduras, gargalos e atritos em cada etapa da jornada de compra/uso do cliente." }
    ]
  },
  {
    title: "Fase 5: Métodos de Teste e Reporte Executivo",
    tools: ["Testes A/B", "Apresentações", "Storytelling de Impacto"],
    tasks: [
      { id: "da-5-1", title: "Conceitos de Teste A/B e Hipóteses", desc: "Validação estatística de novos layouts, preços ou funcionalidades com taxas de conversão controladas." },
      { id: "da-5-2", title: "Apresentações Executivas para C-Level", desc: "Como organizar relatórios e conclusões técnicas focando em tomadas de decisões práticas do corpo diretivo." },
      { id: "da-5-3", title: "Criação de Storytelling Visuais de Valor", desc: "Utilizar uma paleta correta, design limpo, e retirar excessos visuais (barulho/ruído) de dashboards operacionais." }
    ]
  }
];

const SUGGESTED_CUSTOM_TASKS = [
  { title: "Verificar o terminal interativo SQL do Astroquery", category: "Programação & SQL" },
  { title: "Completar os desafios interativos da aba Desafios", category: "Programação & SQL" },
  { title: "Fazer uma análise exploratória de dados no dataset de vendas pública", category: "Visualização & BI" },
  { title: "Aprender os conceitos de Média, Mediana e Desvio Padrão", category: "Estatística & Mat" },
  { title: "Construir meu primeiro modelo de Regressão Linear com Scikit-Learn", category: "Machine Learning & IA" },
];

export default function RoadmapsModule() {
  const [activeSubTab, setActiveSubTab] = useState<'ds' | 'da' | 'custom'>('ds');
  const [expandedDSPhases, setExpandedDSPhases] = useState<number[]>([0, 1]); // expand first two by default
  const [expandedDAPhases, setExpandedDAPhases] = useState<number[]>([0, 1]);

  // Predefined roadmaps checklist persistence
  const [completedDSItems, setCompletedDSItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('astroquery_completed_ds_roadmap');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [completedDAItems, setCompletedDAItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('astroquery_completed_da_roadmap');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Custom roadmap items
  const [customTasks, setCustomTasks] = useState<CustomTask[]>(() => {
    try {
      const stored = localStorage.getItem('astroquery_custom_roadmap_tasks');
      return stored ? JSON.parse(stored) : [
        { id: 'c-1', title: 'Completar o curso de SQL no Astroquery', category: 'Programação & SQL', completed: true },
        { id: 'c-2', title: 'Criar meu repositório de portfólio no GitHub', category: 'Programação & SQL', completed: false },
        { id: 'c-3', title: 'Praticar conceitos de Álgebra Linear e Matrizes', category: 'Estatística & Mat', completed: false }
      ];
    } catch {
      return [];
    }
  });

  // Form input states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Programação & SQL');
  const [formError, setFormError] = useState('');

  // Persists states
  useEffect(() => {
    localStorage.setItem('astroquery_completed_ds_roadmap', JSON.stringify(completedDSItems));
  }, [completedDSItems]);

  useEffect(() => {
    localStorage.setItem('astroquery_completed_da_roadmap', JSON.stringify(completedDAItems));
  }, [completedDAItems]);

  useEffect(() => {
    localStorage.setItem('astroquery_custom_roadmap_tasks', JSON.stringify(customTasks));
  }, [customTasks]);

  // Listen to window custom storage events to respond instantly when progress is cleared
  useEffect(() => {
    const handleResetSync = () => {
      try {
        const ds = localStorage.getItem('astroquery_completed_ds_roadmap');
        setCompletedDSItems(ds ? JSON.parse(ds) : []);
        
        const da = localStorage.getItem('astroquery_completed_da_roadmap');
        setCompletedDAItems(da ? JSON.parse(da) : []);

        const custom = localStorage.getItem('astroquery_custom_roadmap_tasks');
        setCustomTasks(custom ? JSON.parse(custom) : []);
      } catch {
        setCompletedDSItems([]);
        setCompletedDAItems([]);
        setCustomTasks([]);
      }
    };
    window.addEventListener('storage', handleResetSync);
    return () => {
      window.removeEventListener('storage', handleResetSync);
    };
  }, []);

  // Predefined list toggles
  const toggleDSItem = (id: string) => {
    setCompletedDSItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleDAItem = (id: string) => {
    setCompletedDAItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Predefined Phase Expansion helpers
  const toggleDSPhaseExpand = (index: number) => {
    setExpandedDSPhases(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleDAPhaseExpand = (index: number) => {
    setExpandedDAPhases(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Custom roadmap item actions
  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      setFormError('Por favor, informe a meta ou tarefa de estudo.');
      return;
    }
    const newTask: CustomTask = {
      id: `c-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false
    };
    setCustomTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setFormError('');
  };

  const toggleCustomTask = (id: string) => {
    setCustomTasks(prev => 
      prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  };

  const deleteCustomTask = (id: string) => {
    setCustomTasks(prev => prev.filter(task => task.id !== id));
  };

  const loadSuggestedTasks = () => {
    const suggested = SUGGESTED_CUSTOM_TASKS.map((item, idx) => ({
      id: `c-suggested-${idx}-${Date.now()}`,
      title: item.title,
      category: item.category,
      completed: false
    }));
    setCustomTasks(prev => {
      // Avoid duplication by titles
      const currentTitles = prev.map(t => t.title.toLowerCase());
      const filteredSuggested = suggested.filter(s => !currentTitles.includes(s.title.toLowerCase()));
      return [...prev, ...filteredSuggested];
    });
  };

  const resetCustomRoadmap = () => {
    setCustomTasks([]);
  };

  // Predefined progress stats
  const totalDSTasks = DATA_SCIENCE_ROADMAP.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const progressPercentDS = totalDSTasks > 0 
    ? Math.round((completedDSItems.length / totalDSTasks) * 100) 
    : 0;

  const totalDATasks = DATA_ANALYTICS_ROADMAP.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const progressPercentDA = totalDATasks > 0 
    ? Math.round((completedDAItems.length / totalDATasks) * 100) 
    : 0;

  // Custom roadmap progress stats
  const totalCustomTasks = customTasks.length;
  const completedCustomTasks = customTasks.filter(t => t.completed).length;
  const progressPercentCustom = totalCustomTasks > 0 
    ? Math.round((completedCustomTasks / totalCustomTasks) * 100) 
    : 0;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Programação & SQL':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/30';
      case 'Estatística & Mat':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/30';
      case 'Visualização & BI':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/30';
      case 'Machine Learning & IA':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/30';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-400 border-zinc-200/50 dark:border-zinc-800/30';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Visual Header Welcome banner */}
      <div id="roadmaps-hero-banner" className="relative p-8 md:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 text-white shadow-xl shadow-indigo-100 dark:shadow-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="relative max-w-3xl z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider font-display border border-white/10 uppercase">
            <Route className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            Trilhas Profissionais em Dados
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            Planeje Sua Carreira de Sucesso
          </h1>
          <p className="text-indigo-100 text-sm md:text-base max-w-2xl font-light">
            Siga os planos estruturados recomendados pelo mercado para <span className="font-semibold text-white">Cientistas de Dados</span> ou <span className="font-semibold text-white">Analistas de Dados</span>, ou use o organizador estático para estruturar e gerenciar suas próprias metas personalizadas.
          </p>
        </div>
      </div>

      {/* Selector SubTabs Pills */}
      <div className="flex border-b border-zinc-200/40 dark:border-zinc-800/40 pb-2 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveSubTab('ds')}
          className={`px-5 py-3 rounded-xl font-display font-bold text-xs whitespace-nowrap transition-all uppercase tracking-wider cursor-pointer ${
            activeSubTab === 'ds'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
          }`}
        >
          Cientista de Dados ({progressPercentDS}%)
        </button>
        <button
          onClick={() => setActiveSubTab('da')}
          className={`px-5 py-3 rounded-xl font-display font-bold text-xs whitespace-nowrap transition-all uppercase tracking-wider cursor-pointer ${
            activeSubTab === 'da'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
          }`}
        >
          Analista de Dados ({progressPercentDA}%)
        </button>
        <button
          onClick={() => setActiveSubTab('custom')}
          className={`px-5 py-3 rounded-xl font-display font-bold text-xs whitespace-nowrap transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'custom'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
          }`}
        >
          <ListPlus className="w-3.5 h-3.5" />
          Meu Roadmap Personalizado ({progressPercentCustom}%)
        </button>
      </div>

      {/* Render Main Selected Roadmap View */}
      <div>
        <AnimatePresence mode="wait">
          {activeSubTab === 'ds' && (
            <motion.div
              key="ds"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* DS Track Stats Widget */}
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-purple-100/50 dark:border-zinc-800/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-50">Sua Jornada em Ciência de Dados</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Total acumulado: {completedDSItems.length} de {totalDSTasks} metas conquistadas.</p>
                </div>
                <div className="w-full md:w-72 space-y-1.5 shrink-0">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-zinc-400 uppercase tracking-widest">Progresso da Trilha</span>
                    <span className="text-purple-600 dark:text-purple-400">{progressPercentDS}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-350"
                      style={{ width: `${progressPercentDS}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* DS Phases Accordion list */}
              <div className="space-y-4">
                {DATA_SCIENCE_ROADMAP.map((phase, phaseIdx) => {
                  const isExpanded = expandedDSPhases.includes(phaseIdx);
                  // Calculate tasks in this phase
                  const phaseTaskIds = phase.tasks.map(t => t.id);
                  const completedPhaseTasks = phaseTaskIds.filter(id => completedDSItems.includes(id));
                  const phaseProgress = Math.round((completedPhaseTasks.length / phase.tasks.length) * 100);

                  return (
                    <div 
                      key={phaseIdx} 
                      className={`rounded-2xl border transition-all ${
                        isExpanded 
                          ? 'bg-white dark:bg-zinc-900/80 border-purple-200/50 dark:border-zinc-800' 
                          : 'bg-white dark:bg-zinc-900 border-zinc-250/30 dark:border-zinc-900/40 hover:border-zinc-300/60 dark:hover:border-zinc-800'
                      }`}
                    >
                      {/* Top Header Card */}
                      <div 
                        onClick={() => toggleDSPhaseExpand(phaseIdx)}
                        className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-900/30">
                              FASE {phaseIdx + 1}
                            </span>
                            {phaseProgress === 100 && (
                              <span className="text-[9px] font-bold bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded flex items-center gap-1 uppercase">
                                <Check className="w-2.5 h-2.5 stroke-[3]" /> Concluída
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm md:text-base font-bold font-display text-zinc-900 dark:text-zinc-50">{phase.title}</h4>
                          
                          {/* Badges Tools list */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {phase.tools.map((tool, tIdx) => (
                              <span key={tIdx} className="text-[10px] bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-450 px-2 py-0.5 rounded border border-zinc-250/30 dark:border-zinc-800/40">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Circle Progress element & arrow switcher */}
                        <div className="flex items-center gap-3">
                          <div className="text-right hidden sm:block">
                            <span className="text-[10px] text-zinc-400 block font-light">Fase Concluída</span>
                            <span className="text-xs font-bold font-mono text-zinc-600 dark:text-zinc-300">
                              {completedPhaseTasks.length} de {phase.tasks.length}
                            </span>
                          </div>

                          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="18" cy="18" r="14" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth="2.5" fill="transparent" />
                              <circle 
                                cx="18" cy="18" r="14" 
                                className="stroke-purple-600 dark:stroke-purple-400 transition-all duration-300" 
                                strokeWidth="2.5" fill="transparent" 
                                strokeDasharray={`${2 * Math.PI * 14}`}
                                strokeDashoffset={`${2 * Math.PI * 14 * (1 - phaseProgress / 100)}`}
                              />
                            </svg>
                            <span className="absolute text-[9px] font-bold font-mono text-zinc-700 dark:text-zinc-400">
                              {phaseProgress}%
                            </span>
                          </div>

                          <div className="text-zinc-400 dark:text-zinc-500 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Subtasks details container */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {phase.tasks.map((task) => {
                              const isCompleted = completedDSItems.includes(task.id);
                              return (
                                <div 
                                  key={task.id}
                                  onClick={() => toggleDSItem(task.id)}
                                  className={`p-4 rounded-xl border flex gap-3 transition-all cursor-pointer text-left select-none group ${
                                    isCompleted 
                                      ? 'bg-purple-50/20 dark:bg-purple-950/10 border-purple-200/40 dark:border-purple-900/30' 
                                      : 'bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200/40 dark:border-zinc-800/40 hover:bg-zinc-100/30 dark:hover:bg-zinc-100/5'
                                  }`}
                                >
                                  <div className="pt-0.5 shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 fill-purple-100/50 dark:fill-purple-950/10" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-purple-400 transition-colors" />
                                    )}
                                  </div>
                                  <div className="space-y-1">
                                    <h5 className={`text-xs md:text-sm font-bold font-display leading-tight transition-all ${
                                      isCompleted ? 'text-zinc-500 line-through dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-100'
                                    }`}>
                                      {task.title}
                                    </h5>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">{task.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeSubTab === 'da' && (
            <motion.div
              key="da"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* DA Track Stats Widget */}
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-purple-100/50 dark:border-zinc-800/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-50">Sua Jornada em Análise de Dados</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Total acumulado: {completedDAItems.length} de {totalDATasks} metas conquistadas.</p>
                </div>
                <div className="w-full md:w-72 space-y-1.5 shrink-0">
                  <div className="flex justify-between text-xs font-mono font-bold">
                    <span className="text-zinc-400 uppercase tracking-widest">Progresso da Trilha</span>
                    <span className="text-purple-600 dark:text-purple-400">{progressPercentDA}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-350"
                      style={{ width: `${progressPercentDA}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* DA Phases Accordion list */}
              <div className="space-y-4">
                {DATA_ANALYTICS_ROADMAP.map((phase, phaseIdx) => {
                  const isExpanded = expandedDAPhases.includes(phaseIdx);
                  const phaseTaskIds = phase.tasks.map(t => t.id);
                  const completedPhaseTasks = phaseTaskIds.filter(id => completedDAItems.includes(id));
                  const phaseProgress = Math.round((completedPhaseTasks.length / phase.tasks.length) * 100);

                  return (
                    <div 
                      key={phaseIdx} 
                      className={`rounded-2xl border transition-all ${
                        isExpanded 
                          ? 'bg-white dark:bg-zinc-900/80 border-purple-200/50 dark:border-zinc-800' 
                          : 'bg-white dark:bg-zinc-900 border-zinc-250/30 dark:border-zinc-900/40 hover:border-zinc-300/60 dark:hover:border-zinc-800'
                      }`}
                    >
                      {/* Top Header Card */}
                      <div 
                        onClick={() => toggleDAPhaseExpand(phaseIdx)}
                        className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-900/30">
                              FASE {phaseIdx + 1}
                            </span>
                            {phaseProgress === 100 && (
                              <span className="text-[9px] font-bold bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded flex items-center gap-1 uppercase">
                                <Check className="w-2.5 h-2.5 stroke-[3]" /> Concluída
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm md:text-base font-bold font-display text-zinc-900 dark:text-zinc-50">{phase.title}</h4>
                          
                          {/* Badges Tools list */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {phase.tools.map((tool, tIdx) => (
                              <span key={tIdx} className="text-[10px] bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-455 px-2 py-0.5 rounded border border-zinc-250/30 dark:border-zinc-800/40">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Progress Indicator */}
                        <div className="flex items-center gap-3">
                          <div className="text-right hidden sm:block">
                            <span className="text-[10px] text-zinc-400 block font-light">Fase Concluída</span>
                            <span className="text-xs font-bold font-mono text-zinc-600 dark:text-zinc-300">
                              {completedPhaseTasks.length} de {phase.tasks.length}
                            </span>
                          </div>

                          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="18" cy="18" r="14" className="stroke-zinc-100 dark:stroke-zinc-800" strokeWidth="2.5" fill="transparent" />
                              <circle 
                                cx="18" cy="18" r="14" 
                                className="stroke-purple-600 dark:stroke-purple-400 transition-all duration-300" 
                                strokeWidth="2.5" fill="transparent" 
                                strokeDasharray={`${2 * Math.PI * 14}`}
                                strokeDashoffset={`${2 * Math.PI * 14 * (1 - phaseProgress / 100)}`}
                              />
                            </svg>
                            <span className="absolute text-[9px] font-bold font-mono text-zinc-700 dark:text-zinc-400">
                              {phaseProgress}%
                            </span>
                          </div>

                          <div className="text-zinc-400 dark:text-zinc-500 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Subtasks list details */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {phase.tasks.map((task) => {
                              const isCompleted = completedDAItems.includes(task.id);
                              return (
                                <div 
                                  key={task.id}
                                  onClick={() => toggleDAItem(task.id)}
                                  className={`p-4 rounded-xl border flex gap-3 transition-all cursor-pointer text-left select-none group ${
                                    isCompleted 
                                      ? 'bg-purple-50/20 dark:bg-purple-950/10 border-purple-200/40 dark:border-purple-900/30' 
                                      : 'bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200/40 dark:border-zinc-800/40 hover:bg-zinc-100/30 dark:hover:bg-zinc-100/5'
                                  }`}
                                >
                                  <div className="pt-0.5 shrink-0">
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 fill-purple-100/50 dark:fill-purple-950/10" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-purple-400 transition-colors" />
                                    )}
                                  </div>
                                  <div className="space-y-1">
                                    <h5 className={`text-xs md:text-sm font-bold font-display leading-tight transition-all ${
                                      isCompleted ? 'text-zinc-500 line-through dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-100'
                                    }`}>
                                      {task.title}
                                    </h5>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">{task.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeSubTab === 'custom' && (
            <motion.div
              key="custom"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Creator Form section - 1 Column on Desktop */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-purple-100/60 dark:border-zinc-800 shadow-sm space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg">
                      <ListPlus className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-bold font-display text-base text-zinc-900 dark:text-zinc-50">Criar Metas</h3>
                  </div>
                  
                  <form onSubmit={handleAddCustomTask} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold font-mono tracking-wider text-zinc-400 uppercase block">Meta de Aprendizado</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Aprender regressão de Ridge e Lasso"
                        value={newTaskTitle}
                        onChange={(e) => {
                          setNewTaskTitle(e.target.value);
                          if (e.target.value.trim()) setFormError('');
                        }}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800 text-zinc-850 dark:text-zinc-100 focus:outline-none focus:ring-1.5 focus:ring-purple-500/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold font-mono tracking-wider text-zinc-400 uppercase block">Categoria do Conteúdo</label>
                      <select
                        value={newTaskCategory}
                        onChange={(e) => setNewTaskCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800 text-zinc-850 dark:text-zinc-100 focus:outline-none focus:ring-1.5 focus:ring-purple-500/50 cursor-pointer"
                      >
                        <option value="Programação & SQL">Programação & SQL</option>
                        <option value="Estatística & Mat">Estatística & Mat</option>
                        <option value="Visualização & BI">Visualização & BI</option>
                        <option value="Machine Learning & IA">Machine Learning & IA</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>

                    {formError && (
                      <p className="text-[11px] text-red-500 font-medium select-none">{formError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold font-display text-xs rounded-xl shadow-md shadow-purple-500/10 cursor-pointer flex items-center justify-center gap-1.5 transition-all text-center uppercase tracking-wide"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      Adicionar à Lista
                    </button>
                  </form>
                </div>

                {/* Bulk Actions Quick Help box */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-250/20 dark:border-zinc-800/45 rounded-2xl space-y-4 text-left shadow-sm">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <h4 className="font-bold font-display text-xs text-zinc-800 dark:text-zinc-200">Ações Rápidas</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-450 leading-relaxed font-sans">
                    Você pode zerar suas tarefas personalizadas ou preenchê-las automaticamente com sugestões recomendadas para treinar.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <button
                      onClick={loadSuggestedTasks}
                      className="p-2.5 text-left bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/20 text-purple-600 dark:text-purple-450 text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Injetar Metas Recomendadas
                    </button>
                    
                    <button
                      onClick={resetCustomRoadmap}
                      className="p-2.5 text-left bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-850/60 text-zinc-650 dark:text-zinc-400 text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Limpar Todas as Metas
                    </button>
                  </div>
                </div>
              </div>

              {/* Items List Section - 2 Columns on Desktop */}
              <div className="lg:col-span-2 space-y-6">
                {/* Global custom progress display */}
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-purple-100/60 dark:border-zinc-800/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1 text-left">
                    <h3 className="text-base font-bold font-display text-zinc-900 dark:text-zinc-50">Métricas das Suas Tarefas</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Progresso do planejamento personalizado estático.</p>
                  </div>
                  <div className="w-full md:w-64 space-y-1.5 shrink-0 text-left">
                    <div className="flex justify-between text-xs font-mono font-bold">
                      <span className="text-zinc-400 uppercase tracking-widest">{completedCustomTasks} de {totalCustomTasks} Metas</span>
                      <span className="text-purple-600 dark:text-purple-400">{progressPercentCustom}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentCustom}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Main list */}
                <div className="space-y-3">
                  {customTasks.length === 0 ? (
                    <div className="p-10 rounded-2xl border border-dashed border-zinc-250 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-full animate-bounce">
                        <Map className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 max-w-sm">
                        <h4 className="font-bold text-sm font-display text-zinc-800 dark:text-zinc-100">Nenhuma meta ativa</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Seu roadmap está vazio. Adicione metas no painel esquerdo ou clique abaixo para começar imediatamente com sugestões.</p>
                      </div>
                      <button
                        onClick={loadSuggestedTasks}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold font-display text-xs rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        Carregar Metas Sugeridas Estáticas
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {customTasks.map((task) => {
                        return (
                          <div
                            key={task.id}
                            className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all bg-white dark:bg-zinc-900 ${
                              task.completed
                                ? 'border-zinc-200/50 dark:border-zinc-900/60 opacity-75'
                                : 'border-purple-100/50 dark:border-zinc-800/40 hover:border-purple-100 dark:hover:border-zinc-800'
                            }`}
                          >
                            {/* Left Checkbox & Title */}
                            <div 
                              onClick={() => toggleCustomTask(task.id)}
                              className="flex items-start gap-3.5 cursor-pointer text-left select-none flex-1 min-w-0"
                            >
                              <div className="pt-0.5 shrink-0">
                                {task.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 fill-purple-100/10 dark:fill-purple-950/20" />
                                ) : (
                                  <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-700 hover:text-purple-400 transition-colors" />
                                )}
                              </div>
                              <div className="space-y-1 truncate">
                                <span className={`text-sm font-display font-bold leading-none block ${
                                  task.completed ? 'text-zinc-450 line-through dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-50'
                                }`}>
                                  {task.title}
                                </span>
                                <span className={`inline-block text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border ${getCategoryColor(task.category)}`}>
                                  {task.category}
                                </span>
                              </div>
                            </div>

                            {/* Right Delete Button */}
                            <button
                              onClick={() => deleteCustomTask(task.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg cursor-pointer transition-colors"
                              title="Remover tarefa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
