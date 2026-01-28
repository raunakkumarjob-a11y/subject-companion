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
    "What are variables?",
    "Explain functions",
    "How do loops work?",
  ],
  dsa: [
    "What is Big O?",
    "Arrays vs Linked Lists",
    "Explain binary search",
  ],
  sql: [
    "SELECT basics",
    "How JOINs work",
    "Primary keys",
  ],
  javascript: [
    "let vs const vs var",
    "How Promises work",
    "What are closures?",
  ],
  react: [
    "What are components?",
    "useState explained",
    "Props vs State",
  ],
  'system-design': [
    "URL shortener design",
    "Scaling basics",
    "Load balancing",
  ],
  physics: [
    "Newton's laws",
    "What is momentum?",
    "Explain thermodynamics",
  ],
  chemistry: [
    "Periodic table basics",
    "Chemical bonding",
    "Acids and bases",
  ],
  biology: [
    "Cell structure",
    "DNA basics",
    "Evolution explained",
  ],
  mathematics: [
    "Algebra fundamentals",
    "Derivatives explained",
    "Probability basics",
  ],
  history: [
    "World War overview",
    "Ancient civilizations",
    "Industrial revolution",
  ],
  geography: [
    "Plate tectonics",
    "Climate zones",
    "Human geography",
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
