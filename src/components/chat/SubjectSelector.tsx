import { Subject, subjectConfig } from '@/types/chat';
import { cn } from '@/lib/utils';

interface SubjectSelectorProps {
  currentSubject: Subject;
  onSelectSubject: (subject: Subject) => void;
}

export function SubjectSelector({ currentSubject, onSelectSubject }: SubjectSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-muted-foreground px-1">Choose Your Subject</h3>
      <div className="flex flex-col gap-2">
        {(Object.keys(subjectConfig) as Subject[]).map((subject) => {
          const config = subjectConfig[subject];
          const isActive = currentSubject === subject;
          
          return (
            <button
              key={subject}
              onClick={() => onSelectSubject(subject)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left",
                "border-2 hover:shadow-md",
                isActive
                  ? subject === 'python'
                    ? "bg-python-bg border-python/40 shadow-md"
                    : subject === 'dsa'
                    ? "bg-dsa-bg border-dsa/40 shadow-md"
                    : "bg-sql-bg border-sql/40 shadow-md"
                  : "bg-card border-border hover:border-primary/30"
              )}
            >
              <span className="text-2xl">{config.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-semibold text-sm truncate",
                  isActive
                    ? subject === 'python'
                      ? "text-python"
                      : subject === 'dsa'
                      ? "text-dsa"
                      : "text-sql"
                    : "text-foreground"
                )}>
                  {config.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {config.topics.slice(0, 3).join(' • ')}
                </p>
              </div>
              {isActive && (
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  subject === 'python' ? "bg-python" : subject === 'dsa' ? "bg-dsa" : "bg-sql"
                )} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
