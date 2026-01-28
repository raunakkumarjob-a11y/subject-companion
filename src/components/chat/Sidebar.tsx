import { Field, Subject, techSubjects, nonTechSubjects, TechSubject, NonTechSubject, fieldConfig } from '@/types/chat';
import { SubjectSelector } from './SubjectSelector';
import { ProgressIndicator } from './ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Trash2, X, GraduationCap, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  field: Field;
  subject: Subject;
  onSelectSubject: (subject: Subject) => void;
  progress: number;
  messagesCount: number;
  onClearChat: () => void;
  onChangeField: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  field,
  subject,
  onSelectSubject,
  progress,
  messagesCount,
  onClearChat,
  onChangeField,
  isOpen,
  onClose,
}: SidebarProps) {
  const subjects = field === 'tech' ? techSubjects : nonTechSubjects;
  const subjectKeys = Object.keys(subjects) as (TechSubject | NonTechSubject)[];
  const fieldConfigData = fieldConfig[field];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50",
          "w-64 bg-sidebar border-r flex flex-col",
          "transform transition-transform duration-200 ease-out",
          "lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-14 px-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">Tutor</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden h-7 w-7"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Field Badge */}
        <div className="px-3 py-3 border-b">
          <button
            onClick={onChangeField}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors text-left"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-lg">{fieldConfigData.icon}</span>
            <span className="text-sm font-medium text-foreground">{fieldConfigData.name}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <SubjectSelector
            field={field}
            currentSubject={subject}
            onSelectSubject={(s) => {
              onSelectSubject(s);
              onClose();
            }}
          />

          {messagesCount > 0 && (
            <ProgressIndicator
              subject={subject}
              progress={progress}
              messagesCount={messagesCount}
            />
          )}
        </div>

        {/* Footer */}
        {messagesCount > 0 && (
          <div className="p-3 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
              onClick={onClearChat}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear chat
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
