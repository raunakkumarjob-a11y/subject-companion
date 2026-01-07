import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, RefreshCw, Lightbulb, HelpCircle } from 'lucide-react';
import { Subject, subjectConfig } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onReexplain: () => void;
  onQuiz: () => void;
  isLoading: boolean;
  subject: Subject;
  hasMessages: boolean;
}

export function ChatInput({
  onSendMessage,
  onReexplain,
  onQuiz,
  isLoading,
  subject,
  hasMessages,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const config = subjectConfig[subject];
  const placeholder = `Ask me about ${config.name}... (e.g., "Explain ${config.topics[0]}")`;

  return (
    <div className="border-t bg-card/80 backdrop-blur-sm p-4">
      {/* Quick action buttons */}
      {hasMessages && (
        <div className="flex gap-2 mb-3 flex-wrap">
          <Button
            variant="reexplain"
            size="action"
            onClick={onReexplain}
            disabled={isLoading}
            className="gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Re-explain
          </Button>
          <Button
            variant="quiz"
            size="action"
            onClick={onQuiz}
            disabled={isLoading}
            className="gap-1.5"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            Quick Quiz
          </Button>
          <Button
            variant="outline"
            size="action"
            onClick={() => onSendMessage("Give me a real-world example")}
            disabled={isLoading}
            className="gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Real Example
          </Button>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className={cn(
              "w-full resize-none rounded-xl border-2 bg-background px-4 py-3",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
          />
        </div>
        <Button
          type="submit"
          variant="action"
          size="lg"
          disabled={!input.trim() || isLoading}
          className="shrink-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
