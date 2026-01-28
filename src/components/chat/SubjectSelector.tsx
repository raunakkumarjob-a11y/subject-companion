import { Field, Subject, TechSubject, NonTechSubject, techSubjects, nonTechSubjects } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface SubjectSelectorProps {
  field: Field;
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
}

export function SubjectSelector({ field, currentSubject, onSelectSubject }: SubjectSelectorProps) {
  const subjects = field === 'tech' ? techSubjects : nonTechSubjects;
  const subjectKeys = Object.keys(subjects) as (TechSubject | NonTechSubject)[];

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground px-2 mb-2">Subjects</p>
      {subjectKeys.map((subjectKey) => {
        const config = subjects[subjectKey];
        const isActive = currentSubject === subjectKey;
        
        return (
          <button
            key={subjectKey}
            onClick={() => onSelectSubject(subjectKey)}
            className={cn(
              "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all text-left",
              "hover:bg-accent",
              isActive && "bg-primary/10"
            )}
          >
            <span className="text-lg">{config.icon}</span>
            <span className={cn(
              "flex-1 text-sm",
              isActive ? "font-medium text-foreground" : "text-muted-foreground"
            )}>
              {config.name}
            </span>
            {isActive && (
              <Check className="w-3.5 h-3.5 text-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
