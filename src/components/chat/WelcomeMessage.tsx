import { Subject, subjectConfig } from '@/types/chat';
import { Button } from '@/components/ui/button';

interface WelcomeMessageProps {
  subject: Subject;
  onStartConversation: (topic: string) => void;
}

export function WelcomeMessage({ subject, onStartConversation }: WelcomeMessageProps) {
  const config = subjectConfig[subject];

  const starterQuestions: Record<Subject, string[]> = {
    python: [
      "What are variables and how do I use them?",
      "Explain functions with a simple example",
      "How do for loops work in Python?",
    ],
    dsa: [
      "What is Big O notation?",
      "Explain arrays vs linked lists",
      "How does binary search work?",
    ],
    sql: [
      "What is a SELECT statement?",
      "How do JOINs work?",
      "Explain primary and foreign keys",
    ],
    javascript: [
      "What is the difference between let, const, and var?",
      "How do Promises work?",
      "Explain closures with an example",
    ],
    react: [
      "What are components in React?",
      "How does useState work?",
      "Explain props vs state",
    ],
    'system-design': [
      "How would you design a URL shortener?",
      "What is horizontal vs vertical scaling?",
      "Explain load balancing",
    ],
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-6 slide-up">
        {/* Tutor avatar */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center float-subtle">
          <span className="text-4xl">{config.icon}</span>
        </div>

        {/* Welcome text */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-foreground">
            {config.name} Tutor
          </h2>
          <p className="text-sm text-muted-foreground">
            {config.description}. Ask me anything!
          </p>
        </div>

        {/* Quick start topics */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            Not sure where to start? Try these:
          </p>
          <div className="flex flex-col gap-2">
            {starterQuestions[subject].map((question) => (
              <Button
                key={question}
                variant="tutor"
                onClick={() => onStartConversation(question)}
                className="w-full justify-start text-left h-auto py-3 px-4"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Topics preview */}
        <div className="pt-4">
          <p className="text-xs text-muted-foreground mb-2">Topics we can cover:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
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
