import { Subject, subjectConfig } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  subject: Subject;
  progress: number;
  messagesCount: number;
}

export function ProgressIndicator({ subject, progress, messagesCount }: ProgressIndicatorProps) {
  const config = subjectConfig[subject];
  const activeTopicIndex = Math.min(
    Math.floor((messagesCount / 4) % config.topics.length),
    config.topics.length - 1
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Learning Journey</h3>
        <span className="text-xs font-handwritten text-primary text-lg">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full progress-gradient rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Topic chips */}
      <div className="flex flex-wrap gap-2">
        {config.topics.map((topic, index) => {
          const isActive = index === activeTopicIndex;
          const isCompleted = index < activeTopicIndex;
          
          return (
            <span
              key={topic}
              className={cn(
                "px-2 py-1 text-xs rounded-md transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : isCompleted
                  ? "bg-success/20 text-success line-through"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {topic}
            </span>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <div className="bg-card rounded-lg p-3 border">
          <p className="text-xs text-muted-foreground">Questions Asked</p>
          <p className="text-lg font-handwritten text-foreground">{Math.ceil(messagesCount / 2)}</p>
        </div>
        <div className="bg-card rounded-lg p-3 border">
          <p className="text-xs text-muted-foreground">Topics Explored</p>
          <p className="text-lg font-handwritten text-foreground">{activeTopicIndex + 1}</p>
        </div>
      </div>
    </div>
  );
}
