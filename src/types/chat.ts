export type Subject = 'python' | 'dsa' | 'sql' | 'javascript' | 'react' | 'system-design' | 'computer-science';

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
  subject: Subject | null;
  prepSettings: PrepSettings | null;
  isLoading: boolean;
  progress: number;
}

export const subjectConfig: Record<Subject, {
  name: string;
  icon: string;
  description: string;
  color: string;
  topics: string[];
  exams: string[];
}> = {
  python: {
    name: 'Python',
    icon: '🐍',
    description: 'Master Python for NICET, GAT, TCS NQT, Infosys & coding interviews',
    color: 'from-blue-500 to-cyan-500',
    topics: ['Variables', 'Functions', 'Loops', 'OOP', 'Data Structures', 'File Handling', 'Libraries'],
    exams: ['NICET', 'GAT', 'TCS NQT', 'Infosys', 'Wipro', 'HCL'],
  },
  dsa: {
    name: 'DSA',
    icon: '🧮',
    description: 'Data Structures & Algorithms for FAANG, GATE, NICET & placements',
    color: 'from-purple-500 to-pink-500',
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'DP', 'Hashing', 'Stacks & Queues'],
    exams: ['GATE', 'NICET', 'GAT', 'Google', 'Amazon', 'Microsoft', 'LeetCode'],
  },
  sql: {
    name: 'SQL',
    icon: '🗃️',
    description: 'Database queries for NICET, GAT, Data Analyst & backend interviews',
    color: 'from-orange-500 to-amber-500',
    topics: ['SELECT', 'JOINs', 'Aggregations', 'Subqueries', 'Indexing', 'Transactions', 'Window Functions'],
    exams: ['NICET', 'GAT', 'TCS', 'Infosys', 'Data Analyst', 'Accenture'],
  },
  javascript: {
    name: 'JavaScript',
    icon: '⚡',
    description: 'JavaScript for frontend interviews, NICET, GAT & full-stack roles',
    color: 'from-yellow-500 to-orange-500',
    topics: ['Variables', 'Functions', 'Async/Await', 'DOM', 'Closures', 'Promises', 'ES6+', 'Event Loop'],
    exams: ['NICET', 'GAT', 'Frontend Interviews', 'Full-stack', 'Startup Jobs'],
  },
  react: {
    name: 'React',
    icon: '⚛️',
    description: 'Modern UI development for startups, product companies & frontend roles',
    color: 'from-cyan-500 to-blue-500',
    topics: ['Components', 'Props', 'State', 'Hooks', 'Context', 'Effects', 'Router', 'Performance'],
    exams: ['Frontend Interviews', 'Startup Jobs', 'Product Companies', 'Full-stack'],
  },
  'system-design': {
    name: 'System Design',
    icon: '🏗️',
    description: 'System Architecture for FAANG interviews, senior & tech lead roles',
    color: 'from-green-500 to-emerald-500',
    topics: ['Scalability', 'Databases', 'Caching', 'Load Balancing', 'APIs', 'Microservices', 'CDN'],
    exams: ['FAANG', 'Senior Roles', 'Tech Lead', 'Architect', 'Staff Engineer'],
  },
  'computer-science': {
    name: 'Computer Science',
    icon: '🖥️',
    description: 'OS, DBMS, CN, TOC for GATE, NICET & core CS interviews',
    color: 'from-indigo-500 to-violet-500',
    topics: ['Operating System', 'DBMS', 'Computer Networks', 'TOC', 'Compiler Design', 'COA'],
    exams: ['GATE', 'NICET', 'GAT', 'TCS', 'Infosys', 'ISRO'],
  },
};

export const getSubjectConfig = (subject: Subject) => {
  return subjectConfig[subject];
};
