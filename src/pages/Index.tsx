import { useRef, useEffect, useState } from 'react';
import { useChatStore } from '@/hooks/useChatStore';
import { Sidebar } from '@/components/chat/Sidebar';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ChatInput } from '@/components/chat/ChatInput';
import { WelcomeMessage } from '@/components/chat/WelcomeMessage';
import { SubjectGrid } from '@/components/chat/SubjectGrid';
import { PrepSettings } from '@/components/chat/PrepSettings';
import { getSubjectConfig } from '@/types/chat';
import { Menu, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const {
    messages,
    subject,
    prepSettings,
    isLoading,
    progress,
    setSubject,
    setPrepSettings,
    resetToSubjectSelection,
    resetToPrepSettings,
    sendMessage,
    requestReexplain,
    requestQuiz,
    clearChat,
  } = useChatStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const config = subject ? getSubjectConfig(subject) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Step 1: No subject selected - show subject grid directly
  if (!subject) {
    return (
      <div className="min-h-screen bg-background">
        <header className="h-14 glass border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💻</span>
            <span className="font-semibold text-foreground">Tech Tutor</span>
          </div>
          <ThemeToggle />
        </header>
        <SubjectGrid
          onSelectSubject={setSubject}
        />
      </div>
    );
  }

  // Step 2: Subject selected but no prep settings
  if (!prepSettings) {
    return (
      <div className="min-h-screen bg-background">
        <header className="h-14 glass border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">💻</span>
            <span className="font-semibold text-foreground">Tech Tutor</span>
          </div>
          <ThemeToggle />
        </header>
        <PrepSettings
          subject={subject}
          onBack={resetToSubjectSelection}
          onComplete={setPrepSettings}
        />
      </div>
    );
  }

  // Step 3: All set - show chat interface
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        subject={subject}
        onSelectSubject={setSubject}
        progress={progress}
        messagesCount={messages.length}
        onClearChat={clearChat}
        onChangeSubject={resetToSubjectSelection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 glass border-b flex items-center px-4 gap-3 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-8 w-8"
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={resetToPrepSettings}
            className="h-8 w-8"
            title="Change prep settings"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2 flex-1">
            {config && (
              <>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                  <span className="text-base">{config.icon}</span>
                </div>
                <span className="font-medium text-foreground text-sm">{config.name}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/5">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">{Math.round(progress)}%</span>
              </div>
            )}
            <ThemeToggle />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeMessage
              subject={subject}
              prepSettings={prepSettings}
              onStartConversation={sendMessage}
            />
          ) : (
            <div className="max-w-3xl mx-auto p-4 space-y-3">
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
