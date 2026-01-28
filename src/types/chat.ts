export type Field = 'tech' | 'non-tech';

export type TechSubject = 'python' | 'dsa' | 'sql' | 'javascript' | 'react' | 'system-design';
export type NonTechSubject = 'physics' | 'chemistry' | 'biology' | 'mathematics' | 'history' | 'geography';
export type Subject = TechSubject | NonTechSubject;

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PrepSettings {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusArea: string;
  sessionGoal: string;
}

export interface ChatState {
  messages: Message[];
  field: Field | null;
  subject: Subject | null;
  prepSettings: PrepSettings | null;
  isLoading: boolean;
  progress: number;
}

export const fieldConfig: Record<Field, {
  name: string;
  icon: string;
  description: string;
}> = {
  tech: {
    name: 'Technical',
    icon: '💻',
    description: 'Programming, DSA, System Design & more',
  },
  'non-tech': {
    name: 'Non-Technical',
    icon: '📚',
    description: 'Physics, Chemistry, Biology & more',
  },
};

export const techSubjects: Record<TechSubject, {
  name: string;
  icon: string;
  description: string;
  topics: string[];
}> = {
  python: {
    name: 'Python',
    icon: '🐍',
    description: 'Learn Python programming from basics to advanced concepts',
    topics: ['Variables', 'Functions', 'Loops', 'OOP', 'Data Structures', 'File Handling'],
  },
  dsa: {
    name: 'DSA',
    icon: '🧮',
    description: 'Master DSA concepts for coding interviews',
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'DP'],
  },
  sql: {
    name: 'SQL',
    icon: '🗃️',
    description: 'Learn database queries and management',
    topics: ['SELECT', 'JOINs', 'Aggregations', 'Subqueries', 'Indexing', 'Transactions'],
  },
  javascript: {
    name: 'JavaScript',
    icon: '⚡',
    description: 'Master JavaScript from fundamentals to ES6+',
    topics: ['Variables', 'Functions', 'Async/Await', 'DOM', 'Closures', 'Promises'],
  },
  react: {
    name: 'React',
    icon: '⚛️',
    description: 'Build modern UIs with React components and hooks',
    topics: ['Components', 'Props', 'State', 'Hooks', 'Context', 'Effects'],
  },
  'system-design': {
    name: 'System Design',
    icon: '🏗️',
    description: 'Design scalable systems for interviews and real-world apps',
    topics: ['Scalability', 'Databases', 'Caching', 'Load Balancing', 'APIs', 'Microservices'],
  },
};

export const nonTechSubjects: Record<NonTechSubject, {
  name: string;
  icon: string;
  description: string;
  topics: string[];
}> = {
  physics: {
    name: 'Physics',
    icon: '⚡',
    description: 'Understand the laws of nature and universe',
    topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics', 'Waves'],
  },
  chemistry: {
    name: 'Chemistry',
    icon: '🧪',
    description: 'Explore matter, reactions, and molecular structures',
    topics: ['Organic', 'Inorganic', 'Physical Chemistry', 'Biochemistry', 'Reactions', 'Periodic Table'],
  },
  biology: {
    name: 'Biology',
    icon: '🧬',
    description: 'Study life and living organisms',
    topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Anatomy', 'Botany'],
  },
  mathematics: {
    name: 'Mathematics',
    icon: '📐',
    description: 'Master mathematical concepts and problem-solving',
    topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry', 'Number Theory'],
  },
  history: {
    name: 'History',
    icon: '🏛️',
    description: 'Explore civilizations, events, and historical figures',
    topics: ['Ancient History', 'Medieval', 'Modern History', 'World Wars', 'Indian History', 'Revolutions'],
  },
  geography: {
    name: 'Geography',
    icon: '🌍',
    description: 'Study Earth, landscapes, and human geography',
    topics: ['Physical Geography', 'Climate', 'Maps', 'Population', 'Resources', 'Environment'],
  },
};

export const getSubjectConfig = (subject: Subject) => {
  if (subject in techSubjects) {
    return techSubjects[subject as TechSubject];
  }
  return nonTechSubjects[subject as NonTechSubject];
};

export const subjectConfig = { ...techSubjects, ...nonTechSubjects };
