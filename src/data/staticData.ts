import { GlossaryItem, CheatSheetItem, ExerciseItem, ProjectIdea, LessonItem, RandomChallenge } from '../types';

// Let's create high quality glossary items for Data Science
export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'overfitting',
    term: 'Overfitting (Sobreajuste)',
    definition: 'Fenômeno onde o modelo de Machine Learning aprende tão bem os detalhes e ruídos do conjunto de treino que perde a capacidade de generalizar para novos dados (teste). O modelo "decora" em vez de aprender as tendências gerais.',
    category: 'Machine Learning',
    difficulty: 'Intermediário',
    example: 'Um classificador de imagens que atinge 100% de acerto nas fotos de treino de gatos, mas falha ao identificar um gato de cor diferente em fotos novas.'
  },
  {
    id: 'underfitting',
    term: 'Underfitting (Subajuste)',
    definition: 'Ocorre quando o modelo é simples demais para capturar a estrutura subjacente dos dados. Ele apresenta alto viés e baixo desempenho tanto nos dados de treino quanto nos de teste.',
    category: 'Machine Learning',
    difficulty: 'Iniciante',
    example: 'Tentar ajustar uma linha reta (Regressão Linear) para modelar um padrão nitidamente curvo (quadrático) de dados.'
  },
  {
    id: 'data-cleaning',
    term: 'Limpeza de Dados (Data Cleaning)',
    definition: 'O processo de identificar e corrigir (ou remover) registros corrompidos, incorretos, ausentes ou irrelevantes de um conjunto de dados para prepará-lo para análise ou modelagem.',
    category: 'Preparação de Dados',
    difficulty: 'Iniciante',
    example: 'Tratar valores nulos de idade substituindo-os pela mediana do grupo, ou remover e-mails duplicados em uma lista de contatos.'
  },
  {
    id: 'join',
    term: 'SQL JOIN',
    definition: 'Cláusula do SQL usada para combinar linhas de duas ou mais tabelas com base em uma coluna relacionada entre elas.',
    category: 'SQL / Banco de Dados',
    difficulty: 'Iniciante',
    example: 'SELECT clientes.nome, pedidos.valor FROM clientes INNER JOIN pedidos ON clientes.id = pedidos.cliente_id;'
  },
  {
    id: 'normalizacao',
    term: 'Normalização (Min-Max Scaling)',
    definition: 'Técnica de dimensionamento de dados que reescala os valores de uma feature numérica para caberem dentro de um intervalo pré-definido, geralmente entre 0 e 1 ou -1 e 1.',
    category: 'Engenharia de Features',
    difficulty: 'Intermediário',
    example: 'Transformar preços de casas (de $100k a $2M) e tamanhos (de 50m² a 500m²) no mesmo range de [0, 1] para que algoritmos de distância (como KNN) não sejam enviesados por grandezas numéricas.'
  },
  {
    id: 'bias-variance',
    term: 'Viés vs Variância (Bias-Variance Tradeoff)',
    definition: 'O balanço fundamental em Machine Learning de minimizar dois tipos de erros: o Viés (erro por suposições simplistas) e a Variância (erro por sensibilidade excessiva a pequenas flutuações do treino). Apoia a busca pelo modelo ideal.',
    category: 'Machine Learning',
    difficulty: 'Avançado',
    example: 'Árvores de decisão profundas têm alta variância e baixo viés, enquanto regressão linear simples tem baixo nível de variância e alto viés.'
  },
  {
    id: 'feature-engineering',
    term: 'Engenharia de Features',
    definition: 'O ato de transformar variáveis brutas ou criar novas variáveis a partir do conhecimento de negócios, a fim de expor melhor o padrão dos dados para os algoritmos de previsão.',
    category: 'Engenharia de Features',
    difficulty: 'Intermediário',
    example: 'A partir de uma coluna com data completa "2026-06-22", extrair colunas explícitas como "Dia_da_Semana", "Mês" ou "Fim_de_Semana" (True/False).'
  },
  {
    id: 'p-valor',
    term: 'P-Value (P-Valor)',
    definition: 'Na Estatística, é a probabilidade de se obter uma estatística de teste igual ou mais extrema do que aquela observada em uma amostra, assumindo que a Hipótese Nula (H0) seja verdadeira. Indica a significância estatística.',
    category: 'Estatística',
    difficulty: 'Avançado',
    example: 'Se p-valor < 0.05, normalmente rejeitamos a Hipótese Nula com 95% de confiança de que o e-feito observado é real e não fruto do acaso.'
  },
  {
    id: 'gradient-descent',
    term: 'Gradiente Descendente',
    definition: 'Algoritmo de otimização iterativo usado para encontrar os parâmetros de um modelo que minimizam a função de perda (erro). Ele caminha na direção oposta ao vetor gradiente de maior inclinação.',
    category: 'Machine Learning',
    difficulty: 'Avançado',
    example: 'Ajustar os pesos (W) e viés (b) de uma rede neural a cada época de treinamento para reduzir o custo total estimado.'
  },
  {
    id: 'lambda-functions',
    term: 'Funções Lambda (Anônimas)',
    definition: 'Pequenas funções descartáveis em Python que não precisam de uma declaração formal "def". Úteis para operações rápidas em estruturas do Pandas ou filtros em listas.',
    category: 'Python',
    difficulty: 'Iniciante',
    example: 'df["lucro"] = df["preco"].apply(lambda x: x * 0.15)'
  }
];

// Let's create professional copyable snippets for Cheat Sheets page
export const CHEATSHEET_ITEMS: CheatSheetItem[] = [
  {
    id: 'py-basics',
    title: 'Python Básico & Estruturas',
    category: 'Python Básico',
    language: 'python',
    explanation: 'Sintaxe essencial de Python, estruturas de controle e manipulação das coleções principais (Listas, Dicionários e Comprehensions).',
    code: `# Listas e Loops
frutas = ["abacate", "banana", "cereja"]
for index, fruta in enumerate(frutas):
    print(f"{index}: {fruta}")

# Dicionários (Chave: Valor)
aluno = {
    "nome": "Sofia Silva",
    "curso": "Data Science",
    "progresso": 0.72
}

# List Comprehension (Estilo Python consagrado)
numeros = [1, 2, 3, 4, 5, 6]
quadrados_pares = [x**2 for x in numeros if x % 2 == 0]
# Retorno: [4, 16, 36]

# Estruturas condicionais inline
status = "Aprovado" if aluno["progresso"] >= 0.7 else "Estudando"`
  },
  {
    id: 'pandas-numpy',
    title: 'Pandas & NumPy Essentials',
    category: 'Pandas & NumPy',
    language: 'python',
    explanation: 'Como carregar, filtrar e agregar dados em DataFrames de forma compacta e veloz para as etapas de EDA (Exploratory Data Analysis).',
    code: `import pandas as pd
import numpy as np

# Criação de DataFrame a partir de dicionário
dados = {
    "Vendas": [1200, np.nan, 2100, 850, 4300],
    "Estado": ["SP", "RJ", "SP", "MG", "SP"],
    "Desconto": [0.1, 0.05, 0.15, 0.0, 0.2]
}
df = pd.DataFrame(dados)

# 1. Tratamento de Valores Faltantes (Mediana)
df["Vendas"] = df["Vendas"].fillna(df["Vendas"].median())

# 2. Filtragem de dados avançada
vendas_sp_altas = df[(df["Estado"] == "SP") & (df["Vendas"] > 1000)]

# 3. Agrupamento (Group By) com agregação múltipla
resumo = df.groupby("Estado").agg({
    "Vendas": ["mean", "sum", "count"],
    "Desconto": "max"
})

# 4. Criando colunas condicionais com NumPy np.select
condicoes = [
    df["Vendas"] >= 2000,
    df["Vendas"] >= 1000
]
escolhas = ["Alto Giro", "Médio Giro"]
df["Categoria_Venda"] = np.select(condicoes, escolhas, default="Baixo Giro")`
  },
  {
    id: 'matplotlib-seaborn',
    title: 'Visualização com Matplotlib & Seaborn',
    category: 'Visualização de Dados',
    language: 'python',
    explanation: 'Os principais comandos para gerar gráficos limpos e customizados para análises explicativas com Matplotlib e Seaborn.',
    code: `import matplotlib.pyplot as plt
import seaborn as sns

# Configurando estilo visual moderno
sns.set_theme(style="whitegrid", palette="muted")
plt.figure(figsize=(10, 6))

# Plotando um Gráfico de Dispersão elegante
sns.scatterplot(
    data=df, 
    x="Vendas", 
    y="Desconto", 
    hue="Estado", 
    style="Estado", 
    s=100
)

# Adicionando rótulos explícitos
plt.title("Relação entre Volume de Vendas e Desconto Aplicado", fontsize=14, weight="bold")
plt.xlabel("Total em Vendas (R$)", fontsize=11)
plt.ylabel("Taxa de Desconto (%)", fontsize=11)

# Ajuste fino de limites e legenda
plt.legend(title="Região Geográfica", loc="upper left")
plt.tight_layout()

# Salvando a figura de alta densidade
plt.savefig("vendas_vs_desconto_grafico.png", dpi=300)
plt.show()`
  },
  {
    id: 'sql-queries',
    title: 'Fundamentos de Consultas SQL',
    category: 'Fundamentos de SQL',
    language: 'sql',
    explanation: 'As principais funções e estruturas do SQL em nível de busca, junção de tabelas, ordenação e contagem agrupada de subconjuntos de dados.',
    code: `-- 1. Seleção Básica com Apelido (Alias) e Filtro
SELECT 
    nome AS cliente_nome, 
    cidade, 
    renda_mensal
FROM clientes
WHERE renda_mensal > 5000 AND status_cadastro = 'Ativo';

-- 2. Agrupamento com Agregação e Filtro Pós-Agrupamento (HAVING)
SELECT 
    categoria, 
    COUNT(*) AS total_itens, 
    AVG(preco) AS preco_medio
FROM produtos
GROUP BY categoria
HAVING AVG(preco) > 150.00
ORDER BY preco_medio DESC;

-- 3. INNER JOIN e LEFT JOIN entre Clientes e Pedidos
SELECT 
    c.id AS id_usuario,
    c.nome AS cliente,
    p.numero_pedido,
    p.valor_total
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.status = 'Entregue';

-- 4. Funções de Janela (Window Functions) essenciais
SELECT 
    nome,
    departamento,
    salario,
    RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS rank_salario
FROM funcionarios;`
  }
];

// Let's model a mock database structure for visual and simulated interactive query console.
export interface MockDatabaseTable {
  name: string;
  description: string;
  columns: string[];
  records: Record<string, any>[];
}

export const MOCK_DATABASE: Record<string, MockDatabaseTable> = {
  clientes: {
    name: 'clientes',
    description: 'Cadastro de clientes da varejista Astroquery',
    columns: ['id', 'nome', 'estado', 'idade', 'compras_acumuladas'],
    records: [
      { id: 1, nome: "Sofia Silva", estado: "SP", idade: 28, compras_acumuladas: 1250.50 },
      { id: 2, nome: "Arthur Santos", estado: "RJ", idade: 34, compras_acumuladas: 450.00 },
      { id: 3, nome: "Mariana Costa", estado: "MG", idade: 22, compras_acumuladas: 2100.20 },
      { id: 4, nome: "Gabriel Souza", estado: "SP", idade: 45, compras_acumuladas: 890.00 },
      { id: 5, nome: "Beatriz Lima", estado: "PR", idade: 31, compras_acumuladas: 3100.00 }
    ]
  },
  pedidos: {
    name: 'pedidos',
    description: 'Registro histórico de produtos comprados',
    columns: ['id', 'cliente_id', 'produto', 'data_pedido', 'valor'],
    records: [
      { id: 101, cliente_id: 1, produto: "Notebook", data_pedido: "2026-05-12", valor: 4500.00 },
      { id: 102, cliente_id: 3, produto: "Teclado Mecânico", data_pedido: "2026-05-15", valor: 350.00 },
      { id: 103, cliente_id: 2, produto: "Monitor 24", data_pedido: "2026-05-20", valor: 1200.00 },
      { id: 104, cliente_id: 1, produto: "Mouse Sem Fio", data_pedido: "2026-05-22", valor: 150.00 },
      { id: 105, cliente_id: 5, produto: "Cadeira Gamer", data_pedido: "2026-05-25", valor: 1800.00 }
    ]
  }
};

// Curated exercises (including interactive simulated SQL exercises too)
export const EXERCISES_LIST: ExerciseItem[] = [
  {
    id: 'ex-01',
    title: 'Viés vs Variância em Algoritmos Gulosos',
    type: 'teorico',
    category: 'Fundamentos de ML',
    difficulty: 'Intermediário',
    question: 'Explique o comportamento de viés e variância em uma Árvore de Decisão sem limite de profundidade (max_depth=None), comparada a um modelo simples composto por apenas um nó de divisão (Decision Stump ou max_depth=1).',
    solution: 'Uma Árvore de Decisão sem limite de profundidade (max_depth=None) consegue dividir os dados de treino até isolar cada amostra perfeitamente. Isso reduz o VIÉS a zero (ou próximo disso) no treino, mas infla a VARIÂNCIA a níveis absurdos, gerando OVERFITTING extremo (ela se moldará a ruídos). \n\nPor outro lado, uma Árvore de max_depth=1 (Decision Stump) possui BAIXÍSSIMA VARIÂNCIA (seu corte de decisão dificilmente mudará com pequenas variações nos dados), mas um VIÉS muito alto (é muito inflexível para aprender as curvas de dados complexos), gerando UNDERFITTING.',
    hint: 'Lembre-se do que acontece quando o modelo é excessivamente ramificado e tenta engolir cada exceção numérica como regra.'
  },
  {
    id: 'ex-02',
    title: 'Entendimento de Joins na Prática',
    type: 'teorico',
    category: 'SQL / Modelagem',
    difficulty: 'Iniciante',
    question: 'Qual é a diferença funcional crítica entre uma consulta utilizando LEFT JOIN comparada a uma consulta utilizando INNER JOIN ao correlacionar tabelas de Clientes com tabelas de Pedidos?',
    solution: 'O INNER JOIN busca apenas a interseção entre as tabelas: ou seja, ele APENAS retornará os registros de Clientes que possuem pelo menos um registro correspondente na tabela de Pedidos. Clientes sem compras não são exibidos.\n\nO LEFT JOIN retorna TODOS os registros da tabela à Esquerda (Clientes), mesmo que eles não tenham nenhum pedido relacionado cadastrado na tabela da direita. Para os clientes que não compraram, as colunas retornadas do pedido exibirão valores NULOS (NULL), permitindo mapear leads inativos.',
    hint: 'Considere a representação dos conjuntos de Venn e o que acontece quando um cliente novato ainda não tem nenhuma compra efetuada.'
  },
  {
    id: 'ex-sql-01',
    title: 'Desafio SQL 1: Localizando Clientes Paulistas',
    type: 'sql',
    category: 'Fundamentos de SQL',
    difficulty: 'Iniciante',
    question: 'Escreva uma consulta SQL para selecionar as colunas "nome", "estado" e "compras_acumuladas" da tabela "clientes" apenas para os clientes cujo estado seja exatamente "SP".',
    solution: 'SELECT nome, estado, compras_acumuladas FROM clientes WHERE estado = \'SP\';',
    hint: 'Use a tabela "clientes" e filtre aplicando a cláusula WHERE estado = \'SP\'. Escreva em letras maiúsculas ou minúsculas e finalize se quiser sem ponto e vírgula.',
    sqlExpectedQuery: 'SELECT nome, estado, compras_acumuladas FROM clientes WHERE estado = \'SP\'',
    sqlResponseData: {
      columns: ['nome', 'estado', 'compras_acumuladas'],
      rows: [
        { nome: 'Sofia Silva', estado: 'SP', compras_acumuladas: 1250.50 },
        { nome: 'Gabriel Souza', estado: 'SP', compras_acumuladas: 890.00 }
      ]
    }
  },
  {
    id: 'ex-sql-02',
    title: 'Desafio SQL 2: Ticket Médio Alto por Cliente',
    type: 'sql',
    category: 'Construção Avançada SQL',
    difficulty: 'Intermediário',
    question: 'Escreva uma consulta SQL simples para selecionar "nome" e "compras_acumuladas" dos clientes da tabela "clientes" que tenham comprado acima de 1200 reais cumulativos (compras_acumuladas > 1200) e ordene decrescente pelo valor acumulado.',
    solution: 'SELECT nome, compras_acumuladas FROM clientes WHERE compras_acumuladas > 1200 ORDER BY compras_acumuladas DESC;',
    hint: 'Aplique WHERE compras_acumuladas > 1200 e adicione ORDER BY compras_acumuladas DESC no fim.',
    sqlExpectedQuery: 'SELECT nome, compras_acumuladas FROM clientes WHERE compras_acumuladas > 1200 ORDER BY compras_acumuladas DESC',
    sqlResponseData: {
      columns: ['nome', 'compras_acumuladas'],
      rows: [
        { nome: 'Beatriz Lima', compras_acumuladas: 3100.00 },
        { nome: 'Mariana Costa', compras_acumuladas: 2100.20 },
        { nome: 'Sofia Silva', compras_acumuladas: 1250.50 }
      ]
    }
  },
  {
    id: 'ex-sql-03',
    title: 'Desafio SQL 3: Cruzamento de Clientes e Produtos',
    type: 'sql',
    category: 'SQL Multi-tabelas',
    difficulty: 'Avançado',
    question: 'Crie uma consulta de relacionamento JOIN. Selecione os campos cl.nome (apelidado de "cliente"), pe.produto e pe.valor a partir da tabela "clientes cl" INNER JOIN com "pedidos pe" associando pelo ID do cliente (cl.id = pe.cliente_id).',
    solution: 'SELECT cl.nome AS cliente, pe.produto, pe.valor FROM clientes cl INNER JOIN pedidos pe ON cl.id = pe.cliente_id;',
    hint: 'Use a junção INNER JOIN correspondendo clientes cl com pedidos pe na chave estrangeira.',
    sqlExpectedQuery: 'SELECT cl.nome AS cliente, pe.produto, pe.valor FROM clientes cl INNER JOIN pedidos pe ON cl.id = pe.cliente_id',
    sqlResponseData: {
      columns: ['cliente', 'produto', 'valor'],
      rows: [
        { cliente: 'Sofia Silva', produto: 'Notebook', valor: 4500.00 },
        { cliente: 'Mariana Costa', produto: 'Teclado Mecânico', valor: 350.00 },
        { cliente: 'Arthur Santos', produto: 'Monitor 24', valor: 1200.00 },
        { cliente: 'Sofia Silva', produto: 'Mouse Sem Fio', valor: 150.00 },
        { cliente: 'Beatriz Lima', produto: 'Cadeira Gamer', valor: 1800.00 }
      ]
    }
  }
];

// Curated guidelines for roadmaps (Lessons in Tracks)
export const LESSONS_LIST: LessonItem[] = [
  // Track Python & Libraries
  {
    id: 'py-01',
    title: 'Fundamentos de Python para Dados',
    track: 'python',
    category: 'Módulo 1: Introdução ao Ecossistema',
    description: 'Aprenda sobre escopos de variáveis, Listas, Tuplas, Dicionários, controle de fluxo interativo e a declaração de List Comprehensions.',
    estimatedTime: '20 min'
  },
  {
    id: 'py-02',
    title: 'Introdução ao NumPy: Vetorização',
    track: 'python',
    category: 'Módulo 1: Introdução ao Ecossistema',
    description: 'Entenda os Ndarrays, a diferença crítica entre listas e arrays vetorizados de baixo nível C, e operações de álgebra linear simples.',
    estimatedTime: '25 min'
  },
  {
    id: 'py-03',
    title: 'Pandas: Estruturação com DataFrames',
    track: 'python',
    category: 'Módulo 2: Manipulação & EDA',
    description: 'Como carregar CSVs, inspecionar tipos de dados (.info(), .describe()), fatiar com .loc[] e .iloc[] e filtrar por condições lógicas.',
    estimatedTime: '35 min'
  },
  {
    id: 'py-04',
    title: 'Tratamento de Dados e Joins com Pandas',
    track: 'python',
    category: 'Módulo 2: Manipulação & EDA',
    description: 'Aprenda a aplicar imputações em dados nulos com .fillna(), descartar duplicados, utilizar concatenações e .merge() ao estilo SQL.',
    estimatedTime: '40 min'
  },
  {
    id: 'py-05',
    title: 'Sinfonia de Plotagem: Seaborn & Matplotlib',
    track: 'python',
    category: 'Módulo 3: Visualização do Negócio',
    description: 'Aprenda quando usar Gráficos de Barras, Boxplots, Histogramas e Mapas de Calor de correlação para desmistificar as variáveis.',
    estimatedTime: '30 min'
  },

  // Track SQL
  {
    id: 'sql-01',
    title: 'Modelagem de Bancos Relacionais',
    track: 'sql',
    category: 'Módulo 1: Alicerce Relacional',
    description: 'O que são Chaves Primárias (PK), Chaves Estrangeiras (FK), integridade referencial e os paradigmas OLTP vs OLAP.',
    estimatedTime: '15 min'
  },
  {
    id: 'sql-02',
    title: 'Projeções e Filtros com SELECT & WHERE',
    track: 'sql',
    category: 'Módulo 1: Alicerce Relacional',
    description: 'Construindo consultas enxutas. Uso de operadores condicionais AND, OR, NOT, condicionais de intervalo BETWEEN e LIKE para busca parcial textual.',
    estimatedTime: '20 min'
  },
  {
    id: 'sql-03',
    title: 'O Poder da Agregação: GROUP BY',
    track: 'sql',
    category: 'Módulo 2: Agrupamento & Sumarização',
    description: 'Estudo aprofundado das funções matemáticas SUM, AVG, COUNT, MIN, MAX e filtros pós-agregação baseados no delimitador HAVING.',
    estimatedTime: '30 min'
  },
  {
    id: 'sql-04',
    title: 'Múltiplas Junções: Dominando os JOINs',
    track: 'sql',
    category: 'Módulo 2: Agrupamento & Sumarização',
    description: 'Aplicação prática de INNER JOIN, LEFT JOIN, RIGHT JOIN e FULL OUTER JOIN. Entenda os impactos de chaves duplicadas e nulas nos dados.',
    estimatedTime: '35 min'
  },
  {
    id: 'sql-05',
    title: 'Subqueries, CTEs e Window Functions',
    track: 'sql',
    category: 'Módulo 3: SQL Avançado para Analistas',
    description: 'Eleve o patamar de suas análises utilizando CTEs (with) para organizar fluxos e Window Functions (ROW_NUMBER, RANK, LAG, LEAD) de performance.',
    estimatedTime: '45 min'
  }
];

// Project ideas for student portfolios with actionable instructions
export const PROJECT_IDEAS: ProjectIdea[] = [
  {
    id: 'proj-01',
    title: 'Análise de Audiência e Popularidade do Spotify',
    objective: 'Analisar um dataset de faixas de música, relacionando métricas como dançabilidade, compasso e energia com o total de reproduções semanais.',
    datasetName: 'Spotify Tracks Dataset (Kaggle)',
    datasetLink: 'https://www.kaggle.com/datasets/maharshipandya/spotify-tracks-dataset',
    difficulty: 'Iniciante',
    steps: [
      'Faça o download do arquivo de dados no Kaggle e leia-o usando o Pandas read_csv().',
      'Execute uma checagem de linhas nulas e decida remover ou imputar registros de músicas sem nome.',
      'Plote um histograma de "Dançabilidade" para entender a distribuição da métrica.',
      'Calcule a matriz de correlação de Pearson entre Energia, Acústica e Popularidade. Plote usando o sns.heatmap().',
      'Descubra quem são os 10 artistas mais frequentes no Top 100 de popularidade e calcule a média de suas métricas.'
    ]
  },
  {
    id: 'proj-02',
    title: 'Previsão de Preços de Imóveis por Bairro',
    objective: 'Desenvolver um pipeline de engenharia de features e treinar um modelo de regressão para prever o valor de habitações coletando dados territoriais.',
    datasetName: 'House Prices: Advanced Regression (Kaggle)',
    datasetLink: 'https://www.kaggle.com/c/house-prices-advanced-regression-techniques',
    difficulty: 'Intermediário',
    steps: [
      'Importe os dados e analise a distribuição da variável alvo "SalePrice". Aplique uma transformação logarítmica caso haja alta assimetria.',
      'Separe as variáveis categóricas das numéricas.',
      'Crie novas variáveis estruturadas como a Idade do Imóvel (Ano da Venda menos Ano de Construção).',
      'Utilize One-Hot Encoding ou Ordinal Encoding para colunas de classificação como Qualidade do Acabamento.',
      'Treine um regressor simples (ex: Random Forest Regressor) e avalie as previsões usando métricas de IA como RMSE e MAE.'
    ]
  },
  {
    id: 'proj-03',
    title: 'Análise de Churn de Assinantes de Software (SaaS)',
    objective: 'Identificar perfis comportamentais e predizer a probabilidade de clientes cancelarem o serviço mensal recorrente coletando histórico de chamados.',
    datasetName: 'Telco Churn Dataset (Kaggle)',
    datasetLink: 'https://www.kaggle.com/datasets/blastchar/telco-customer-churn',
    difficulty: 'Avançado',
    steps: [
      'Inspecione os dados e trate a coluna "TotalCharges", transformando-a para numérica e tratando vazios nascidos de novos usuários.',
      'Explore as correlações: clientes com contratos mensais apresentam uma taxa de cancelamento substancialmente maior do que contratos bienais?',
      'Selecione as features mais informativas utilizando testes estatísticos ou seleção de importância baseada em árvores.',
      'Equilibre o dataset utilizando técnicas de sobreamostragem (como SMOTE) se houver forte desbalanceamento de classes.',
      'Treine modelos classificadores (Regressão Logística, XGBoost) e meça a performance com F1-Score e Curva ROC-AUC.'
    ]
  }
];

// Pool of random fast challenges to practice Data Science
export const RANDOM_CHALLENGES: RandomChallenge[] = [
  {
    title: 'Efeito Fim-de-Semana no Tráfego de Apps',
    target: 'Compare e meça se o tráfego do servidor em dias de sábado e domingo é estatisticamente menor do que nos dias úteis.',
    difficulty: 'Iniciante',
    suggestedDataset: 'Logins diários de uma rede corporativa fictícia ou dados do Google Analytics.',
    steps: [
      'Converta o vetor de logs para datetime',
      'Crie a booleana "eh_fim_de_semana"',
      'Gere um boxplot comparativo de visitas entre dias úteis e fins de semana.'
    ]
  },
  {
    title: 'Detetive de Outliers na Cadeia de Suprimentos',
    target: 'Identifique os 2% superiores de preços absurdos nas mercadorias de um distribuidor usando pontuação estatística de Z-score.',
    difficulty: 'Intermediário',
    suggestedDataset: 'Lista de inventários industriais.',
    steps: [
      'Calcule a média e o desvio padrão da coluna de preço unitário',
      'Subtraia e divida para gerar o Z-score individual',
      'Selecione aqueles cujo valor absoluto do Z-score seja superior a 2.5.'
    ]
  },
  {
    title: 'Detecção de Sentimentos em Tweets Tecnológicos',
    target: 'Use expressões regulares ou contagem direta para separar tweets em categorias de tom (Positivo, Crítico, Neutro) com base em palavras-chave.',
    difficulty: 'Avançado',
    suggestedDataset: 'Twitter reviews sobre lançamentos de chips de IA.',
    steps: [
      'Limpe o texto removendo links e menções com @',
      'Crie um pequeno dicionário de termos felizes vs. de reclamação',
      'Faça o score e trace a evolução do sentimento dia a dia.'
    ]
  },
  {
    title: 'O Enigma do Sorvete e da Temperatura',
    target: 'Determine a taxa de alteração nas vendas de sorvete para cada 1 grau Celsius que sobe na temperatura ambiente.',
    difficulty: 'Iniciante',
    suggestedDataset: 'Métrica simples climática de vendas.',
    steps: [
      'Importe a Regressão Linear do Scikit-Learn',
      'Treine a reta usando Temperatura como X e Vendas como Y',
      'Inspecione o coeficiente angular (coef_) do modelo gerado.'
    ]
  }
];

// Links úteis
export interface UsefulLink {
  title: string;
  url: string;
  description: string;
  category: 'Documentação' | 'Datasets' | 'Comunidade';
}

export const USEFUL_LINKS: UsefulLink[] = [
  {
    title: 'Python Official Documentation',
    url: 'https://docs.python.org/3/',
    description: 'O guia completo oficial contendo estruturas fundamentais e a biblioteca de módulos nativa do Python.',
    category: 'Documentação'
  },
  {
    title: 'Pandas Docs',
    url: 'https://pandas.pydata.org/docs/',
    description: 'Tutoriais práticos e guia de referência completo da biblioteca de manipulação estruturada mais importante do mundo.',
    category: 'Documentação'
  },
  {
    title: 'Seaborn Documentation',
    url: 'https://seaborn.pydata.org/',
    description: 'Galeria visual vibrante e exemplos prontos para gráficos estatísticos elegantes utilizando uma linha de comandos simples.',
    category: 'Documentação'
  },
  {
    title: 'Kaggle Datasets',
    url: 'https://www.kaggle.com/datasets',
    description: 'A maior biblioteca de conjuntos de dados mundiais fornecidos de graça pelas corporações para testes de ML e análise exploratória.',
    category: 'Datasets'
  },
  {
    title: 'Google Dataset Search',
    url: 'https://datasetsearch.research.google.com/',
    description: 'Motor de buscas do Google dedicado a localizar dados públicos de universidades e agências governamentais pelo globo.',
    category: 'Datasets'
  },
  {
    title: 'Our World in Data',
    url: 'https://ourworldindata.org/',
    description: 'Dados científicos globais confiáveis sobre saúde, economia, meio ambiente e demografia humana.',
    category: 'Datasets'
  },
  {
    title: 'Stack Overflow Data Science',
    url: 'https://stackoverflow.com/questions/tagged/data-science',
    description: 'Comunidade global de especialistas resolvendo bugs de código e sanando dúvidas sobre pacotes estatísticos complexos.',
    category: 'Comunidade'
  }
];
