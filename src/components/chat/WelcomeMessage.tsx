import { Subject, getSubjectConfig } from '@/types/chat';
import { PrepSettings as PrepSettingsType } from '@/types/chat';
import { ArrowRight, Sparkles, Target, BookOpen } from 'lucide-react';

interface WelcomeMessageProps {
  subject: Subject;
  prepSettings: PrepSettingsType | null;
  onStartConversation: (topic: string) => void;
}

const allStarterQuestions: Record<string, string[]> = {
  python: [
    "Explain Python variables with exam examples",
    "How do functions work? Show NICET pattern questions",
    "Explain OOP concepts with interview questions",
  ],
  dsa: [
    "What is Big O notation? Which companies ask this?",
    "Compare Array vs Linked List with exam patterns",
    "Explain Binary Search step by step with GATE questions",
  ],
  sql: [
    "Explain JOINs with diagrams and company interview examples",
    "What are Window Functions? Show Data Analyst questions",
    "Subqueries vs JOINs - which exam asks what?",
  ],
  javascript: [
    "Explain Closures with real interview questions",
    "How does the Event Loop work? Which companies ask this?",
    "var vs let vs const - complete comparison with tricky questions",
  ],
  react: [
    "Explain React Hooks with startup interview patterns",
    "How does useState work internally?",
    "Props vs State - complete guide with examples",
  ],
  'system-design': [
    "Design a URL shortener - FAANG interview style",
    "How does Load Balancing work? Architecture diagram",
    "Database scaling strategies for senior interviews",
  ],
  'computer-science': [
    "Explain Process vs Thread with GATE questions",
    "OSI Model - complete breakdown for NICET",
    "Normalization in DBMS - exam-focused explanation",
  ],
};

export function WelcomeMessage({ subject, prepSettings, onStartConversation }: WelcomeMessageProps) {
  const config = getSubjectConfig(subject);
  const starterQuestions = allStarterQuestions[subject] || ["Ask me anything!"];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-sm w-full slide-up">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center mb-4`}>
          <span className="text-2xl">{config.icon}</span>
        </div>

        <h1 className="text-xl font-semibold text-foreground mb-1">
          {config.name}
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          {config.description}
        </p>

        {prepSettings && (
          <div className="mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3" />
              <span className="capitalize">{prepSettings.difficulty} level</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Target className="w-3 h-3" />
              <span>Focus: {prepSettings.focusArea}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3" />
              <span className="capitalize">{prepSettings.sessionGoal}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">Try asking</p>
          {starterQuestions.map((question) => (
            <button
              key={question}
              onClick={() => onStartConversation(question)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-card border hover:bg-accent hover:border-primary/20 transition-colors text-left group"
            >
              <span className="text-sm text-foreground">{question}</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">Target Exams</p>
          <div className="flex flex-wrap gap-1.5">
            {config.exams.map((exam) => (
              <span
                key={exam}
                className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-medium"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
