import { Field, Subject, TechSubject, NonTechSubject, techSubjects, nonTechSubjects } from '@/types/chat';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SubjectGridProps {
  field: Field;
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
}

export function SubjectGrid({ field, onSelectSubject, onBack }: SubjectGridProps) {
  const subjects = field === 'tech' ? techSubjects : nonTechSubjects;
  const subjectKeys = Object.keys(subjects) as (TechSubject | NonTechSubject)[];

  return (
    <div className="flex flex-col min-h-[60vh] p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to field selection</span>
      </button>

      <div className="text-center mb-8 slide-up">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Select a Subject
        </h2>
        <p className="text-muted-foreground text-sm">
          {field === 'tech' ? 'Technical subjects for your prep' : 'Non-technical subjects to explore'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
        {subjectKeys.map((subjectKey, index) => {
          const config = subjects[subjectKey];
          
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
                  <span className="text-3xl mb-2 block">{config.icon}</span>
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
                {config.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
