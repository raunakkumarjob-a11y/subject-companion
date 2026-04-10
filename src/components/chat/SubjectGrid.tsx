import { Subject, subjectConfig } from '@/types/chat';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface SubjectGridProps {
  onSelectSubject: (subject: Subject) => void;
}

export function SubjectGrid({ onSelectSubject }: SubjectGridProps) {
  const subjectKeys = Object.keys(subjectConfig) as Subject[];

  return (
    <div className="flex flex-col min-h-[60vh] p-6">
      <div className="text-center mb-8 slide-up">
        <span className="text-4xl mb-3 block">💻</span>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Choose Your Subject
        </h2>
        <p className="text-muted-foreground text-sm">
          Select a technical subject to start learning
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
        {subjectKeys.map((subjectKey, index) => {
          const config = subjectConfig[subjectKey];
          
          return (
            <button
              key={subjectKey}
              onClick={() => onSelectSubject(subjectKey)}
              className={cn(
                "group relative p-5 rounded-xl border transition-all duration-300",
                "bg-card hover:bg-accent/50",
                "border-border hover:border-primary/50",
                "hover:shadow-md hover:-translate-y-0.5",
                "text-left fade-in"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center mb-2`}>
                    <span className="text-xl">{config.icon}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {config.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {config.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {config.exams.slice(0, 3).map((exam) => (
                  <span
                    key={exam}
                    className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium"
                  >
                    {exam}
                  </span>
                ))}
                {config.exams.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]">
                    +{config.exams.length - 3} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
