import { Message, Subject } from '@/types/chat';
import { cn } from '@/lib/utils';
import { User, GraduationCap } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  subject: Subject;
}

export function MessageBubble({ message, subject }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';

  // Simple code block detection and rendering
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3);
        const firstLineEnd = codeContent.indexOf('\n');
        const language = firstLineEnd > 0 ? codeContent.slice(0, firstLineEnd).trim() : '';
        const code = firstLineEnd > 0 ? codeContent.slice(firstLineEnd + 1) : codeContent;
        
        return (
          <div key={index} className="my-3">
            {language && (
              <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-t-lg border border-b-0 font-mono">
                {language}
              </div>
            )}
            <pre className={cn(
              "code-block",
              language ? "rounded-t-none" : ""
            )}>
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      
      // Handle inline code
      const inlineParts = part.split(/(`[^`]+`)/g);
      return (
        <span key={index}>
          {inlineParts.map((inline, i) => {
            if (inline.startsWith('`') && inline.endsWith('`')) {
              return (
                <code key={i} className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">
                  {inline.slice(1, -1)}
                </code>
              );
            }
            return <span key={i}>{inline}</span>;
          })}
        </span>
      );
    });
  };

  return (
    <div
      className={cn(
        "flex gap-3 fade-in",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          isAssistant
            ? "bg-primary/10 text-primary"
            : subject === 'python'
            ? "bg-python-bg text-python"
            : subject === 'dsa'
            ? "bg-dsa-bg text-dsa"
            : "bg-sql-bg text-sql"
        )}
      >
        {isAssistant ? (
          <GraduationCap className="w-5 h-5" />
        ) : (
          <User className="w-5 h-5" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3",
          isAssistant
            ? "message-tutor rounded-tl-sm shadow-tutor"
            : "message-student rounded-tr-sm shadow-student"
        )}
      >
        <div className={cn(
          "whitespace-pre-wrap break-words",
          isAssistant ? "" : "font-normal"
        )}>
          {renderContent(message.content)}
        </div>
        <p className={cn(
          "text-xs mt-2 opacity-60",
          isAssistant ? "font-sans text-[0.65rem]" : ""
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
