import { Field, fieldConfig } from '@/types/chat';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface FieldSelectorProps {
  onSelectField: (field: Field) => void;
}

export function FieldSelector({ onSelectField }: FieldSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="text-center mb-8 slide-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Choose Your Field
        </h1>
        <p className="text-muted-foreground text-sm">
          Select a category to get started with your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        {(Object.keys(fieldConfig) as Field[]).map((field, index) => {
          const config = fieldConfig[field];
          
          return (
            <button
              key={field}
              onClick={() => onSelectField(field)}
              className={cn(
                "group relative p-6 rounded-2xl border-2 transition-all duration-300",
                "bg-card hover:bg-accent/50",
                "border-border hover:border-primary/50",
                "hover:shadow-lg hover:-translate-y-1",
                "text-left fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-4xl mb-3 block">{config.icon}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {config.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
