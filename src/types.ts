export type Difficulty = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty: Difficulty;
  example: string;
}

export interface CheatSheetItem {
  id: string;
  title: string;
  category: string;
  language: 'python' | 'sql' | 'markdown';
  code: string;
  explanation: string;
}

export interface SQLSimResult {
  columns: string[];
  rows: Record<string, string | number | null>[];
}

export interface ExerciseItem {
  id: string;
  title: string;
  type: 'teorico' | 'sql';
  category: string;
  difficulty: Difficulty;
  question: string;
  solution: string; // The text solution or complete SQL query description
  hint: string;
  sqlExpectedQuery?: string; // Optional canonical query to match if any
  sqlResponseData?: SQLSimResult; // Simulated database response if executed query matches keywords
}

export interface ProjectIdea {
  id: string;
  title: string;
  objective: string;
  datasetName: string;
  datasetLink: string;
  difficulty: Difficulty;
  steps: string[];
}

export interface LessonItem {
  id: string;
  title: string;
  track: 'python' | 'sql';
  category: string;
  description: string;
  estimatedTime: string; // e.g. "15min"
}

export interface RandomChallenge {
  title: string;
  target: string;
  difficulty: Difficulty;
  suggestedDataset: string;
  steps: string[];
}
