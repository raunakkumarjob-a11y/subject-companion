import { Subject } from '@/types/chat';
import { SubjectSelector } from './SubjectSelector';
import { ProgressIndicator } from './ProgressIndicator';
import { Button } from '@/components/ui/button';
import { Trash2, BookOpen, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  subject: Subject;
  onSelectSubject: (subject: Subject) => void;
  progress: number;
  messagesCount: number;
  onClearChat: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  subject,
  onSelectSubject,
  progress,
  messagesCount,
  onClearChat,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50",
          "w-72 bg-sidebar border-r flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          "lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="font-handwritten text-xl text-foreground">Subject Tutor</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <SubjectSelector
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
        <div className="p-4 border-t space-y-3">
          {messagesCount > 0 && (
            <Button
              variant="outline"
              className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onClearChat}
            >
              <Trash2 className="w-4 h-4" />
              Clear Conversation
            </Button>
          )}
          <p className="text-xs text-muted-foreground text-center">
            Your friendly AI tutor for learning
          </p>
        </div>
      </aside>
    </>
  );
}
