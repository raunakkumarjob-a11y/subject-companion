import { Message, Subject } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  subject: Subject;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3);
        const firstLineEnd = codeContent.indexOf('\n');
        const language = firstLineEnd > 0 ? codeContent.slice(0, firstLineEnd).trim() : '';
        const code = firstLineEnd > 0 ? codeContent.slice(firstLineEnd + 1) : codeContent;
        
        return (
          <div key={index} className="my-2">
            {language && (
              <div className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-t-md border border-b-0 font-mono">
                {language}
              </div>
            )}
            <pre className={cn("code-block", language && "rounded-t-none")}>
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      
      // Process inline formatting: bold, italic, inline code
      return (
        <span key={index}>
          {formatInlineText(part)}
        </span>
      );
    });
  };

  const formatInlineText = (text: string) => {
    // Split by bold (**text**), italic (*text*), and inline code (`text`)
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    const parts = text.split(regex);

    return parts.map((part, i) => {
      // Bold text
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic text (single asterisk, but not bold)
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        return (
          <em key={i} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      // Inline code
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1 py-0.5 bg-muted rounded text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2 fade-in",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
          isAssistant
            ? "message-tutor rounded-tl-md"
            : "message-student rounded-tr-md"
        )}
      >
        <div className="whitespace-pre-wrap break-words leading-relaxed">
          {renderContent(message.content)}
        </div>
        <p className="text-[10px] mt-1.5 opacity-50">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}