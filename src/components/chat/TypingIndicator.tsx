export function TypingIndicator() {
  return (
    <div className="flex gap-3 fade-in">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <span className="text-lg">📚</span>
      </div>
      <div className="message-tutor rounded-2xl rounded-tl-sm px-5 py-4 shadow-tutor">
        <div className="flex gap-1.5 items-center">
          <span className="text-sm font-handwritten text-tutor-foreground/80 mr-2">Thinking</span>
          <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
        </div>
      </div>
    </div>
  );
}
