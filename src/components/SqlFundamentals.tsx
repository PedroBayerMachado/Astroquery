import React, { useState, useEffect } from 'react';
import { MOCK_DATABASE, EXERCISES_LIST } from '../data/staticData';
import { ExerciseItem } from '../types';
import { Terminal, Database, Play, CheckCircle, Info, ChevronRight, HelpCircle, ArrowRight, Lightbulb, RefreshCw, Sparkles } from 'lucide-react';

interface SqlFundamentalsProps {
  completedExercises: string[];
  completeExercise: (id: string) => void;
}

export default function SqlFundamentals({ completedExercises, completeExercise }: SqlFundamentalsProps) {
  const sqlExercises = EXERCISES_LIST.filter(ex => ex.type === 'sql');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [userQuery, setUserQuery] = useState<string>('SELECT * FROM clientes;');
  
  // Terminal outputs
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [terminalMessage, setTerminalMessage] = useState<string>('Terminal pronto. Escreva sua query e clique em "Executar Query".');
  const [queryColumns, setQueryColumns] = useState<string[]>(['id', 'nome', 'estado', 'idade', 'compras_acumuladas']);
  const [queryRows, setQueryRows] = useState<Record<string, any>[]>(MOCK_DATABASE.clientes.records);
  const [activeSchemaTab, setActiveSchemaTab] = useState<'clientes' | 'pedidos'>('clientes');
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const currentExercise = sqlExercises[activeExerciseIndex];

  // Set default query when exercise changes
  useEffect(() => {
    if (currentExercise.id === 'ex-sql-01') {
      setUserQuery('SELECT nome, estado, compras_acumuladas FROM clientes WHERE estado = \'SP\';');
    } else if (currentExercise.id === 'ex-sql-02') {
      setUserQuery('SELECT nome, compras_acumuladas FROM clientes WHERE compras_acumuladas > 1200 ORDER BY compras_acumuladas DESC;');
    } else {
      setUserQuery('SELECT cl.nome AS cliente, pe.produto, pe.valor FROM clientes cl INNER JOIN pedidos pe ON cl.id = pe.cliente_id;');
    }
    setIsSuccess(null);
    setTerminalMessage('Sandbox pronta para execução. Edite a query acima à vontade.');
    setShowSolution(false);
  }, [activeExerciseIndex]);

  // Real-time faux SQL Parser
  const executeSQLCompiler = () => {
    let query = userQuery.trim().replace(/\s+/g, ' ');
    const lowerQuery = query.toLowerCase();

    if (!lowerQuery.startsWith('select')) {
      setIsSuccess(false);
      setTerminalMessage('Erro de Sintaxe: O Astroquery Simulator suporta apenas comandos de leitura [SELECT] nesta versão estática.');
      return;
    }

    try {
      // 1. Joint relational parser query
      if (lowerQuery.includes('join') || lowerQuery.includes('pe.produto') || lowerQuery.includes('cliente_id')) {
        // Evaluate Challenge 3 Inner Join OR customizable inner join simulation
        const rows = MOCK_DATABASE.pedidos.records.map(p => {
          const cl = MOCK_DATABASE.clientes.records.find(c => c.id === p.cliente_id);
          return {
            cliente: cl ? cl.nome : 'Cliente Desconhecido',
            produto: p.produto,
            valor: `R$ ${p.valor.toFixed(2)}`
          };
        });

        setQueryColumns(['cliente', 'produto', 'valor']);
        setQueryRows(rows);

        // Check if this fulfills Exercise SQL 3
        if (currentExercise.id === 'ex-sql-03') {
          setIsSuccess(true);
          setTerminalMessage('Sucesso! Você uniu a tabela de clientes e pedidos através do ID correlacionado. Exercício Concluído! 🎉');
          completeExercise(currentExercise.id);
        } else {
          setIsSuccess(true);
          setTerminalMessage('Query executada com sucesso! Tabela de Clientes e Pedidos correlacionada em tempo real (INNER JOIN).');
        }
        return;
      }

      // 2. Base table evaluation
      let sourceRecords: Record<string, any>[] = [];
      let originalColumns: string[] = [];

      if (lowerQuery.includes('from pedidos')) {
        sourceRecords = JSON.parse(JSON.stringify(MOCK_DATABASE.pedidos.records));
        originalColumns = [...MOCK_DATABASE.pedidos.columns];
      } else if (lowerQuery.includes('from clientes')) {
        sourceRecords = JSON.parse(JSON.stringify(MOCK_DATABASE.clientes.records));
        originalColumns = [...MOCK_DATABASE.clientes.columns];
      } else {
        setIsSuccess(false);
        setTerminalMessage('Erro de Compilação: Tabela não localizada na consulta. Use as tabelas "clientes" ou "pedidos".');
        return;
      }

      // Check filters (WHERE clause)
      let filteredRecords = [...sourceRecords];

      if (lowerQuery.includes('where')) {
        const whereClause = lowerQuery.split('where')[1].split('order by')[0].split('group by')[0].trim();
        
        if (whereClause.includes('estado') && (whereClause.includes('sp') || whereClause.includes("'sp'"))) {
          filteredRecords = filteredRecords.filter(r => r.estado === 'SP');
        } else if (whereClause.includes('compras_acumuladas') && whereClause.includes('1200')) {
          filteredRecords = filteredRecords.filter(r => r.compras_acumuladas > 1200);
        } else if (whereClause.includes('idade') && whereClause.includes('30')) {
          filteredRecords = filteredRecords.filter(r => r.idade > 30);
        } else if (whereClause.includes('idade') && whereClause.includes('40')) {
          filteredRecords = filteredRecords.filter(r => r.idade > 40);
        }
      }

      // Check sorter (ORDER BY clause)
      if (lowerQuery.includes('order by')) {
        const orderPart = lowerQuery.split('order by')[1].trim();
        if (orderPart.includes('compras_acumuladas')) {
          if (orderPart.includes('desc')) {
            filteredRecords.sort((a, b) => b.compras_acumuladas - a.compras_acumuladas);
          } else {
            filteredRecords.sort((a, b) => a.compras_acumuladas - b.compras_acumuladas);
          }
        } else if (orderPart.includes('idade')) {
          if (orderPart.includes('desc')) {
            filteredRecords.sort((a, b) => b.idade - a.idade);
          } else {
            filteredRecords.sort((a, b) => a.idade - b.idade);
          }
        }
      }

      // Select column projections
      let projectedColumns = [...originalColumns];
      if (!lowerQuery.includes('select *')) {
        const selectPart = lowerQuery.split('select')[1].split('from')[0].trim();
        const selectedCols = selectPart.split(',').map(c => c.trim().split(' as ')[0].trim());
        
        projectedColumns = originalColumns.filter(origCol => {
          return selectedCols.some(selCol => selCol.replace(/cl\.|pe\./g, '') === origCol);
        });

        if (projectedColumns.length === 0) {
          // Fallback project whatever matching was queried or fallback to all
          projectedColumns = selectedCols;
        }
      }

      // Map rows conforming to projection
      const finalRows = filteredRecords.map(rec => {
        const row: Record<string, any> = {};
        projectedColumns.forEach(col => {
          if (col === 'compras_acumuladas' && typeof rec[col] === 'number') {
            row[col] = `R$ ${rec[col].toFixed(2)}`;
          } else if (col === 'valor' && typeof rec[col] === 'number') {
            row[col] = `R$ ${rec[col].toFixed(2)}`;
          } else {
            row[col] = rec[col] !== undefined ? rec[col] : 'N/A';
          }
        });
        return row;
      });

      setQueryColumns(projectedColumns);
      setQueryRows(finalRows);

      // Validate corresponding exercises specifically
      if (currentExercise.id === 'ex-sql-01') {
        const isTargetMatch = lowerQuery.includes('clientes') && lowerQuery.includes('estado') && lowerQuery.includes('sp') && !lowerQuery.includes('join');
        if (isTargetMatch) {
          setIsSuccess(true);
          setTerminalMessage('Excelente! Você filtrou os usuários por estado SP. Desafio SQL Concluído! 🎉');
          completeExercise(currentExercise.id);
        } else {
          setIsSuccess(true);
          setTerminalMessage('Consulta executada com êxito! Dica: atente-se às colunas pedidas para fechar o desafio.');
        }
      } else if (currentExercise.id === 'ex-sql-02') {
        const isTargetMatch = lowerQuery.includes('clientes') && lowerQuery.includes('compras_acumuladas') && (lowerQuery.includes('1200') || lowerQuery.includes('> 1200')) && lowerQuery.includes('order by') && lowerQuery.includes('desc');
        if (isTargetMatch) {
          setIsSuccess(true);
          setTerminalMessage('Perfeito! Clientes paulistas e sulistas ordenados decrescente acima de R$1.200,00 de Ticket. Desafio Concluído! 🚀');
          completeExercise(currentExercise.id);
        } else {
          setIsSuccess(true);
          setTerminalMessage('Sua query compilou! No entanto, certifique-se de ordenar decrescente pelo Ticket Acumulado para concluir.');
        }
      }

    } catch (err) {
      setIsSuccess(false);
      setTerminalMessage('Erro de Sintaxe SQL. Verifique o posicionamento das vírgulas e cláusulas básicas.');
    }
  };

  const copySolutionQuery = () => {
    navigator.clipboard.writeText(currentExercise.solution);
    setTerminalMessage('Query de solução copiada para a Área de Transferência! Cole no terminal.');
  };

  const injectSolution = () => {
    setUserQuery(currentExercise.solution);
    setTerminalMessage('Query de solução oficial injetada. Clique em "Executar Query" para testar!');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction to SQL fundamentals */}
      <div id="sql-header-intro" className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono">Bancos de Dados</span>
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-zinc-900 dark:text-zinc-50">Fundamentos de SQL Relacional</h1>
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-4xl">
          A linguagem SQL (Structured Query Language) é a base de comunicação de qualquer Cientista de Dados. Por meio dela, filtramos, agrupamos e unimos bases massivas de dados guardadas em sistemas como PostgreSQL, MySQL e BigQuery. Veja as quatro engrenagens essenciais:
        </p>

        {/* Visual blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 space-y-1">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">1. SELECT [Projeção]</span>
            <p className="text-xs text-zinc-500">Mapeia exatamente quais colunas físicas ou calculadas serão apresentadas no resultado final.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 space-y-1">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">2. WHERE [Filtro]</span>
            <p className="text-xs text-zinc-500">Cria premissas lógicas de corte (operadores booleanos, strings, numéricas) para descartar dados indesejados.</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 space-y-1">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">3. GROUP BY [Agregação]</span>
            <p className="text-xs text-zinc-500">Condensa múltiplas linhas em grupos discretos para efetuar cálculos consolidados como somas ou médias (SUM, AVG).</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 space-y-1">
            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">4. INNER/LEFT JOIN [União]</span>
            <p className="text-xs text-zinc-500">Une tabelas estrangeiras correlacionando colunas-chave idênticas de cadastros e históricos.</p>
          </div>
        </div>
      </div>

      {/* Explorer section of Simulated Active Database */}
      <div id="sql-database-explorer" className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold font-display text-zinc-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-zinc-50 dark:to-zinc-300">Explorador de Tabelas Ativas (In-Memory Sandbox)</h3>
          </div>
          
          <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button 
              id="btn-schema-clientes"
              onClick={() => setActiveSchemaTab('clientes')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold font-display transition-all cursor-pointer ${
                activeSchemaTab === 'clientes' 
                  ? 'bg-white dark:bg-zinc-700 shadow text-indigo-700 dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              tabela: clientes
            </button>
            <button 
              id="btn-schema-pedidos"
              onClick={() => setActiveSchemaTab('pedidos')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold font-display transition-all cursor-pointer ${
                activeSchemaTab === 'pedidos' 
                  ? 'bg-white dark:bg-zinc-700 shadow text-indigo-700 dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              tabela: pedidos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="p-4 h-full rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Metadata</p>
                <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1 capitalize">{activeSchemaTab}</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  {MOCK_DATABASE[activeSchemaTab].description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Estrutura de Colunas (Dicionário de Dados)</p>
                <div className="flex flex-wrap gap-1.5">
                  {MOCK_DATABASE[activeSchemaTab].columns.map((c) => (
                    <span 
                      key={c} 
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        c === 'id' || c === 'cliente_id' 
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold border border-blue-100 dark:border-blue-900' 
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 overflow-x-auto rounded-2xl border border-zinc-150 dark:border-zinc-800">
            <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400">
              <thead className="bg-zinc-55 dark:bg-zinc-950 text-zinc-500 border-b border-zinc-150 dark:border-zinc-800">
                <tr>
                  {MOCK_DATABASE[activeSchemaTab].columns.map((col) => (
                    <th key={col} className="px-4 py-3 font-mono font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {MOCK_DATABASE[activeSchemaTab].records.map((rec, i) => (
                  <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20">
                    {MOCK_DATABASE[activeSchemaTab].columns.map((col) => (
                      <td key={col} className="px-4 py-2.5 font-mono">
                        {col === 'compras_acumuladas' || col === 'valor'
                          ? `R$ ${rec[col].toFixed(2)}`
                          : rec[col]
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Terminal Sandbox Simulator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Desafios list */}
        <div id="sql-terminal-sandbox" className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 shadow-sm">
            <h3 className="font-extrabold font-display text-zinc-900 dark:text-zinc-50 flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Desafios Práticos SQL
            </h3>
            
            <div className="space-y-3">
              {sqlExercises.map((ex, index) => {
                const isActive = activeExerciseIndex === index;
                const isCompleted = completedExercises.includes(ex.id);
                return (
                  <button
                    key={ex.id}
                    id={`sql-exercise-btn-${ex.id}`}
                    onClick={() => setActiveExerciseIndex(index)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-blue-50/50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-900 text-blue-900 dark:text-blue-100' 
                        : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest block font-mono">{ex.difficulty}</span>
                      <h4 className="font-semibold text-xs truncate mt-0.5">{ex.title}</h4>
                    </div>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-transparent shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Prompt Card */}
            <div className="mt-5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-dashed border-zinc-200 dark:border-zinc-800 space-y-3 font-sans">
              <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-bold text-xs">
                <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
                Instruções do Desafio
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {currentExercise.question}
              </p>
              
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <button 
                  onClick={() => setShowSolution(!showSolution)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  {showSolution ? 'Ocultar Dica & Solução' : 'Ver Solução / Dica'}
                </button>
                
                {showSolution && (
                  <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-indigo-150 space-y-2.5 animate-fade-in text-[11px] leading-relaxed">
                    <p className="text-zinc-650">
                      <strong className="text-indigo-700">Dica:</strong> {currentExercise.hint}
                    </p>
                    <div className="space-y-1">
                      <p className="font-bold text-purple-600">Query Gabarito:</p>
                      <code className="block bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-[10px] font-mono break-all text-zinc-700 dark:text-zinc-300">
                        {currentExercise.solution}
                      </code>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={copySolutionQuery}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-semibold rounded text-[10px] cursor-pointer"
                      >
                        Copiar Query
                      </button>
                      <button 
                        onClick={injectSolution}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded text-[10px] cursor-pointer"
                      >
                        Injetar no Terminal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Console Interactive Simulator */}
        <div className="lg:col-span-8 flex flex-col rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-900 text-zinc-100 h-[640px]">
          
          {/* Header */}
          <div className="px-5 py-3.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-semibold tracking-wide text-zinc-300">Astroquery SQL Terminal Console — v1.2</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
          </div>

          {/* Code Textarea Editor Area */}
          <div className="flex-1 p-4 flex flex-col min-h-0 space-y-3 bg-zinc-900">
            <div className="flex-1 flex flex-col relative font-mono text-sm leading-6">
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center justify-start py-3 bg-zinc-950/20 text-zinc-650 text-xs text-right pr-2 pointer-events-none select-none border-r border-zinc-850">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
              <textarea
                id="sql-interactive-textarea"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full flex-1 bg-transparent text-emerald-300 focus:outline-none resize-none pl-11 py-3 h-full font-mono text-xs md:text-sm tracking-wider leading-relaxed border-none focus:ring-0 placeholder-zinc-700"
                placeholder="Escreva sua consulta SELECT aqui..."
              />
            </div>

            {/* Actions panel */}
            <div className="pt-3 border-t border-zinc-850 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] text-zinc-500 font-mono">Simulador estático em tempo real</span>
              
              <div className="flex gap-2">
                <button
                  id="btn-clear-query"
                  onClick={() => setUserQuery('')}
                  className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-semibold rounded-lg font-mono flex items-center gap-1 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Limpar
                </button>
                <button
                  id="btn-exec-query"
                  onClick={executeSQLCompiler}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold font-display rounded-lg flex items-center gap-2 shadow-lg shadow-emerald-950/30 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Executar Query
                </button>
              </div>
            </div>
          </div>

          {/* Results compiler panel panel */}
          <div className="bg-zinc-950 border-t border-zinc-800 h-[220px] flex flex-col min-h-0">
            <div className="px-4 py-2 border-b border-zinc-850 bg-zinc-950 text-zinc-400 text-[10px] uppercase font-bold tracking-wider flex items-center justify-between shrink-0">
              <span>Resultado da Execução</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                isSuccess === true
                  ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/50'
                  : isSuccess === false
                    ? 'bg-red-900/40 text-red-400 border border-red-800/50'
                    : 'bg-zinc-800 text-zinc-400'
              }`}>
                {isSuccess === true ? 'COMPILADO COERENTE' : isSuccess === false ? 'ERRO DE SINTAXE' : 'AGUARDANDO COMPILAÇÃO'}
              </span>
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-xs space-y-4">
              <p className={`leading-relaxed text-xs ${
                isSuccess === true ? 'text-emerald-400' : isSuccess === false ? 'text-red-400' : 'text-zinc-450'
              }`}>
                {terminalMessage}
              </p>

              {/* Data Rows Preview If compiled ok */}
              {isSuccess !== false && queryRows.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-zinc-850">
                  <table className="w-full text-left text-[11px] text-zinc-300">
                    <thead className="bg-zinc-900 text-zinc-450 border-b border-zinc-850">
                      <tr>
                        {queryColumns.map((col) => (
                          <th key={col} className="px-3 py-2 uppercase font-semibold text-[10px] text-blue-400 tracking-wider whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {queryRows.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-900/50">
                          {queryColumns.map((col) => (
                            <td key={col} className="px-3 py-1.5 text-zinc-200 font-mono whitespace-nowrap">
                              {row[col] !== undefined ? String(row[col]) : 'NULL'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-2.5 bg-zinc-900 text-right text-[10px] text-zinc-500 lowercase">
                    {queryRows.length} linhas retornadas
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
