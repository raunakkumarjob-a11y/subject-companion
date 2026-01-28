import { useState } from 'react';
import { PrepSettings as PrepSettingsType, Subject, getSubjectConfig } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, Sparkles, Target, BookOpen } from 'lucide-react';

interface PrepSettingsProps {
  subject: Subject;
  onBack: () => void;
  onComplete: (settings: PrepSettingsType) => void;
}

const difficultyLevels = [
  { value: 'beginner', label: 'Beginner', icon: '🌱', desc: 'Just starting out' },
  { value: 'intermediate', label: 'Intermediate', icon: '🌿', desc: 'Know the basics' },
  { value: 'advanced', label: 'Advanced', icon: '🌳', desc: 'Deep dive ready' },
] as const;

const sessionGoals = [
  { value: 'learn', label: 'Learn New Concepts', icon: <BookOpen className="w-4 h-4" /> },
  { value: 'practice', label: 'Practice Problems', icon: <Target className="w-4 h-4" /> },
  { value: 'revise', label: 'Quick Revision', icon: <Sparkles className="w-4 h-4" /> },
];

export function PrepSettings({ subject, onBack, onComplete }: PrepSettingsProps) {
  const config = getSubjectConfig(subject);
  const [difficulty, setDifficulty] = useState<PrepSettingsType['difficulty']>('beginner');
  const [focusArea, setFocusArea] = useState<string>(config.topics[0]);
  const [sessionGoal, setSessionGoal] = useState<string>('learn');

  const handleStart = () => {
    onComplete({
      difficulty,
      focusArea,
      sessionGoal,
    });
  };

  return (
    <div className="flex flex-col min-h-[60vh] p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to subjects</span>
      </button>

      <div className="flex-1 max-w-2xl mx-auto w-full space-y-8">
        <div className="text-center slide-up">
          <span className="text-4xl mb-3 block">{config.icon}</span>
          <h2 className="text-xl font-bold text-foreground">{config.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">Customize your learning session</p>
        </div>

        {/* Difficulty */}
        <div className="space-y-3 fade-in" style={{ animationDelay: '100ms' }}>
          <label className="text-sm font-medium text-foreground">Difficulty Level</label>
          <div className="grid grid-cols-3 gap-3">
            {difficultyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setDifficulty(level.value)}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all text-center",
                  difficulty === level.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <span className="text-2xl block mb-1">{level.icon}</span>
                <span className="text-sm font-medium block">{level.label}</span>
                <span className="text-xs text-muted-foreground">{level.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Focus Area */}
        <div className="space-y-3 fade-in" style={{ animationDelay: '200ms' }}>
          <label className="text-sm font-medium text-foreground">Focus Area</label>
          <div className="flex flex-wrap gap-2">
            {config.topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setFocusArea(topic)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all",
                  focusArea === topic
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Session Goal */}
        <div className="space-y-3 fade-in" style={{ animationDelay: '300ms' }}>
          <label className="text-sm font-medium text-foreground">Session Goal</label>
          <div className="grid grid-cols-3 gap-3">
            {sessionGoals.map((goal) => (
              <button
                key={goal.value}
                onClick={() => setSessionGoal(goal.value)}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2",
                  sessionGoal === goal.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <span className={cn(
                  "p-2 rounded-lg",
                  sessionGoal === goal.value ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {goal.icon}
                </span>
                <span className="text-sm font-medium">{goal.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={handleStart}
          size="lg"
          className="w-full fade-in"
          style={{ animationDelay: '400ms' }}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Start Learning
        </Button>
      </div>
    </div>
  );
}
