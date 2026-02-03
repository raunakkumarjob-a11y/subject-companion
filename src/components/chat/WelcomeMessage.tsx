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
    "Variables kya hote hain Python mein?",
    "Functions explain karo with NICET pattern",
    "Loops ke types aur use cases",
  ],
  dsa: [
    "Big O notation kya hai?",
    "Array vs Linked List comparison",
    "Binary Search step by step",
  ],
  sql: [
    "SELECT query basics for NICET",
    "JOINs explain karo diagram ke saath",
    "Primary key vs Foreign key",
  ],
  javascript: [
    "let vs const vs var difference",
    "Promises aur async/await kaise kaam karte hain?",
    "Closures interview question",
  ],
  react: [
    "React Components kya hote hain?",
    "useState hook explain karo",
    "Props vs State difference",
  ],
  'system-design': [
    "URL shortener system design karo",
    "Scaling basics for interviews",
    "Load balancing kaise kaam karta hai?",
  ],
  'computer-science': [
    "OSI model explain karo",
    "Process vs Thread difference",
    "Normalization in DBMS",
  ],
  physics: [
    "Newton's laws JEE pattern mein samjhao",
    "Momentum aur impulse kya hai?",
    "Thermodynamics ke laws",
  ],
  chemistry: [
    "Periodic table trends explain karo",
    "Chemical bonding types NEET ke liye",
    "Acids and bases reactions",
  ],
  biology: [
    "Cell structure NEET diagram ke saath",
    "DNA replication step by step",
    "Evolution theory explain karo",
  ],
  mathematics: [
    "Quadratic equations solve karna sikhao",
    "Derivatives basics JEE ke liye",
    "Probability fundamentals",
  ],
  history: [
    "Indian Independence Movement timeline",
    "World War I aur II overview",
    "Mughal Empire UPSC pattern",
  ],
  geography: [
    "Plate tectonics kya hai?",
    "Indian climate zones explain karo",
    "Population distribution in India",
  ],
  english: [
    "Tenses grammar rules",
    "Common error spotting SSC pattern",
    "Vocabulary building tips",
  ],
  economics: [
    "GDP aur GNP difference",
    "Inflation kya hoti hai?",
    "Indian Budget basics UPSC ke liye",
  ],
  'general-knowledge': [
    "Important current affairs this month",
    "Indian Constitution basics",
    "Famous awards aur winners",
  ],
};

export function WelcomeMessage({ subject, prepSettings, onStartConversation }: WelcomeMessageProps) {
  const config = getSubjectConfig(subject);
  const starterQuestions = allStarterQuestions[subject] || ["Ask me anything!"];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-sm w-full slide-up">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <span className="text-2xl">{config.icon}</span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground mb-1">
          {config.name}
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          {config.description}
        </p>

        {/* Prep Settings Summary */}
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

        {/* Quick starts */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">Try asking</p>
          {starterQuestions.map((question) => (
            <button
              key={question}
              onClick={() => onStartConversation(question)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-card border hover:bg-accent hover:border-primary/20 transition-colors text-left group"
            >
              <span className="text-sm text-foreground">{question}</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">Topics covered</p>
          <div className="flex flex-wrap gap-1.5">
            {config.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
