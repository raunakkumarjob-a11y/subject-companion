export type Field = 'tech' | 'non-tech';

export type TechSubject = 'python' | 'dsa' | 'sql' | 'javascript' | 'react' | 'system-design' | 'computer-science';
export type NonTechSubject = 'physics' | 'chemistry' | 'biology' | 'mathematics' | 'history' | 'geography' | 'english' | 'economics' | 'general-knowledge';
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
  exams: string[];
}> = {
  python: {
    name: 'Python',
    icon: '🐍',
    description: 'NICET, GAT, TCS NQT, Infosys के लिए Python programming',
    topics: ['Variables', 'Functions', 'Loops', 'OOP', 'Data Structures', 'File Handling'],
    exams: ['NICET', 'GAT', 'TCS NQT', 'Infosys', 'Wipro'],
  },
  dsa: {
    name: 'DSA',
    icon: '🧮',
    description: 'FAANG, GATE, NICET के लिए Data Structures & Algorithms',
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'DP'],
    exams: ['GATE', 'NICET', 'GAT', 'Google', 'Amazon', 'Microsoft'],
  },
  sql: {
    name: 'SQL',
    icon: '🗃️',
    description: 'Database queries for NICET, GAT, Data Analyst interviews',
    topics: ['SELECT', 'JOINs', 'Aggregations', 'Subqueries', 'Indexing', 'Transactions'],
    exams: ['NICET', 'GAT', 'TCS', 'Infosys', 'Data Analyst'],
  },
  javascript: {
    name: 'JavaScript',
    icon: '⚡',
    description: 'Frontend interviews, NICET, GAT के लिए JavaScript',
    topics: ['Variables', 'Functions', 'Async/Await', 'DOM', 'Closures', 'Promises'],
    exams: ['NICET', 'GAT', 'Frontend Interviews', 'Full-stack'],
  },
  react: {
    name: 'React',
    icon: '⚛️',
    description: 'Modern UI development for startup & product companies',
    topics: ['Components', 'Props', 'State', 'Hooks', 'Context', 'Effects'],
    exams: ['Frontend Interviews', 'Startup Jobs', 'Product Companies'],
  },
  'system-design': {
    name: 'System Design',
    icon: '🏗️',
    description: 'FAANG interviews, Senior roles के लिए System Architecture',
    topics: ['Scalability', 'Databases', 'Caching', 'Load Balancing', 'APIs', 'Microservices'],
    exams: ['FAANG', 'Senior Roles', 'Tech Lead', 'Architect'],
  },
  'computer-science': {
    name: 'Computer Science',
    icon: '🖥️',
    description: 'GATE, NICET के लिए OS, DBMS, CN, TOC',
    topics: ['Operating System', 'DBMS', 'Computer Networks', 'TOC', 'Compiler Design'],
    exams: ['GATE', 'NICET', 'GAT', 'TCS', 'Infosys'],
  },
};

export const nonTechSubjects: Record<NonTechSubject, {
  name: string;
  icon: string;
  description: string;
  topics: string[];
  exams: string[];
}> = {
  physics: {
    name: 'Physics',
    icon: '⚡',
    description: 'JEE Main/Advanced, NEET, NICET, GAT के लिए Physics',
    topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics', 'Waves'],
    exams: ['JEE Main', 'JEE Advanced', 'NEET', 'NICET', 'GAT', 'Board'],
  },
  chemistry: {
    name: 'Chemistry',
    icon: '🧪',
    description: 'JEE, NEET, NICET के लिए Organic, Inorganic, Physical Chemistry',
    topics: ['Organic', 'Inorganic', 'Physical Chemistry', 'Biochemistry', 'Reactions', 'Periodic Table'],
    exams: ['JEE Main', 'JEE Advanced', 'NEET', 'NICET', 'GAT', 'Board'],
  },
  biology: {
    name: 'Biology',
    icon: '🧬',
    description: 'NEET, AIIMS, NICET के लिए complete Biology',
    topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Anatomy', 'Botany'],
    exams: ['NEET', 'AIIMS', 'NICET', 'GAT', 'Board', 'JIPMER'],
  },
  mathematics: {
    name: 'Mathematics',
    icon: '📐',
    description: 'JEE, Board, NICET, GAT के लिए Mathematics',
    topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry', 'Number Theory'],
    exams: ['JEE Main', 'JEE Advanced', 'Board', 'NICET', 'GAT', 'KVPY'],
  },
  history: {
    name: 'History',
    icon: '🏛️',
    description: 'UPSC, SSC, NICET, GAT के लिए Indian & World History',
    topics: ['Ancient History', 'Medieval', 'Modern History', 'World Wars', 'Indian History', 'Revolutions'],
    exams: ['UPSC', 'SSC', 'State PSC', 'NICET', 'GAT', 'Railway'],
  },
  geography: {
    name: 'Geography',
    icon: '🌍',
    description: 'UPSC, SSC, NICET के लिए Physical & Human Geography',
    topics: ['Physical Geography', 'Climate', 'Maps', 'Population', 'Resources', 'Environment'],
    exams: ['UPSC', 'SSC', 'State PSC', 'NICET', 'GAT', 'Railway'],
  },
  english: {
    name: 'English',
    icon: '📖',
    description: 'NICET, GAT, SSC, Bank exams के लिए English Grammar & Vocabulary',
    topics: ['Grammar', 'Vocabulary', 'Comprehension', 'Error Spotting', 'Sentence Correction', 'Idioms'],
    exams: ['NICET', 'GAT', 'SSC', 'Bank PO', 'CAT', 'CLAT'],
  },
  economics: {
    name: 'Economics',
    icon: '💰',
    description: 'UPSC, Banking, NICET के लिए Indian Economy & Concepts',
    topics: ['Micro Economics', 'Macro Economics', 'Indian Economy', 'Budget', 'Banking', 'Monetary Policy'],
    exams: ['UPSC', 'RBI Grade B', 'Bank PO', 'SSC', 'NICET', 'GAT'],
  },
  'general-knowledge': {
    name: 'General Knowledge',
    icon: '📚',
    description: 'All competitive exams के लिए Static GK & Current Affairs',
    topics: ['Current Affairs', 'Static GK', 'Indian Polity', 'Science', 'Awards', 'Sports'],
    exams: ['UPSC', 'SSC', 'Bank', 'Railway', 'NICET', 'GAT', 'State PSC'],
  },
};

export const getSubjectConfig = (subject: Subject) => {
  if (subject in techSubjects) {
    return techSubjects[subject as TechSubject];
  }
  return nonTechSubjects[subject as NonTechSubject];
};

export const subjectConfig = { ...techSubjects, ...nonTechSubjects };
