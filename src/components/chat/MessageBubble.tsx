import { Message, Subject } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  message: Message;
  subject: Subject;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        "flex gap-2 fade-in",
        isAssistant ? "flex-row" : "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
          isAssistant
            ? "message-tutor rounded-tl-md"
            : "message-student rounded-tr-md"
        )}
      >
        {isAssistant ? (
          <div className="prose prose-sm dark:prose-invert max-w-none markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-lg font-bold text-primary mt-4 mb-2 flex items-center gap-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-bold text-primary mt-3 mb-1.5 flex items-center gap-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-bold mt-2 mb-1 text-accent-foreground">{children}</h3>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-foreground">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-muted-foreground">{children}</em>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono font-medium" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={cn("text-xs", className)} {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="code-block my-2 text-xs overflow-x-auto">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3 rounded-lg border">
                    <table className="w-full text-xs border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-primary/10 text-primary font-semibold">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left border-b font-semibold">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-1.5 border-b border-border/50">{children}</td>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 my-2 text-foreground/90">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 my-2 text-foreground/90">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-3 border-primary/50 pl-3 my-2 italic text-muted-foreground bg-primary/5 rounded-r-lg py-2">
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <hr className="my-3 border-border/50" />
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed mb-2 last:mb-0">{children}</p>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-primary underline hover:no-underline" target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </div>
        )}
        <p className="text-[10px] mt-1.5 opacity-50">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
