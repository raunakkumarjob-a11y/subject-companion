import { useRef, useEffect, useState } from 'react';
import { useChatStore } from '@/hooks/useChatStore';
import { Sidebar } from '@/components/chat/Sidebar';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ChatInput } from '@/components/chat/ChatInput';
import { WelcomeMessage } from '@/components/chat/WelcomeMessage';
import { subjectConfig } from '@/types/chat';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const {
    messages,
    subject,
    isLoading,
    progress,
    setSubject,
    sendMessage,
    requestReexplain,
    requestQuiz,
    clearChat,
  } = useChatStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const config = subjectConfig[subject];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        subject={subject}
        onSelectSubject={setSubject}
        progress={progress}
        messagesCount={messages.length}
        onClearChat={clearChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center px-4 gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <h1 className="font-semibold text-foreground">{config.name} Tutor</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Ask me anything about {config.name}!
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Session progress:</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full progress-gradient rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-handwritten text-primary text-lg">{Math.round(progress)}%</span>
            </div>
          )}
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeMessage
              subject={subject}
              onStartConversation={sendMessage}
            />
          ) : (
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  subject={subject}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <ChatInput
          onSendMessage={sendMessage}
          onReexplain={requestReexplain}
          onQuiz={requestQuiz}
          isLoading={isLoading}
          subject={subject}
          hasMessages={messages.length > 0}
        />
      </main>
    </div>
  );
};

export default Index;
