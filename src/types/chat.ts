export type Subject = 'python' | 'dsa' | 'sql';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  subject: Subject;
  isLoading: boolean;
  progress: number;
}

export const subjectConfig: Record<Subject, {
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
    name: 'Data Structures & Algorithms',
    icon: '🧮',
    description: 'Master DSA concepts for coding interviews and problem solving',
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Dynamic Programming'],
  },
  sql: {
    name: 'SQL',
    icon: '🗃️',
    description: 'Learn database queries and management with SQL',
    topics: ['SELECT', 'JOINs', 'Aggregations', 'Subqueries', 'Indexing', 'Transactions'],
  },
};
