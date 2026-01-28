import { useState, useCallback } from 'react';
import { Message, Subject, Field, ChatState, PrepSettings } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useChatStore() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    field: null,
    subject: null,
    prepSettings: null,
    isLoading: false,
    progress: 0,
  });

  const setField = useCallback((field: Field) => {
    setState((prev) => ({
      ...prev,
      field,
      subject: null,
      prepSettings: null,
      messages: [],
      progress: 0,
    }));
  }, []);

  const setSubject = useCallback((subject: Subject) => {
    setState((prev) => ({
      ...prev,
      subject,
      messages: [],
      progress: 0,
    }));
  }, []);

  const setPrepSettings = useCallback((prepSettings: PrepSettings) => {
    setState((prev) => ({
      ...prev,
      prepSettings,
    }));
  }, []);

  const resetToFieldSelection = useCallback(() => {
    setState({
      messages: [],
      field: null,
      subject: null,
      prepSettings: null,
      isLoading: false,
      progress: 0,
    });
  }, []);

  const resetToSubjectSelection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      subject: null,
      prepSettings: null,
      messages: [],
      progress: 0,
    }));
  }, []);

  const resetToPrepSettings = useCallback(() => {
    setState((prev) => ({
      ...prev,
      prepSettings: null,
      messages: [],
      progress: 0,
    }));
  }, []);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const message: Message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
      progress: Math.min(100, prev.progress + (role === 'assistant' ? 5 : 2)),
    }));

    return message;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    // Add user message
    addMessage('user', content);

    try {
      // Get the last N messages for context (keeping it simple with last 10)
      const recentMessages = [...state.messages.slice(-10), { role: 'user' as const, content }];

      const { data, error } = await supabase.functions.invoke('tutor-chat', {
        body: {
          messages: recentMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          subject: state.subject,
          prepSettings: state.prepSettings,
        },
      });

      if (error) throw error;

      // Add assistant response
      addMessage('assistant', data.response);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage(
        'assistant',
        "Hmm, I seem to be having trouble right now. Could you try asking again? Sometimes my thinking cap needs a moment! 🎓"
      );
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [state.messages, state.subject, state.prepSettings, addMessage]);

  const requestReexplain = useCallback(async () => {
    const lastAssistantMessage = [...state.messages]
      .reverse()
      .find((m) => m.role === 'assistant');

    if (lastAssistantMessage) {
      await sendMessage("Can you explain that again in simpler terms? I didn't quite understand.");
    }
  }, [state.messages, sendMessage]);

  const requestQuiz = useCallback(async () => {
    await sendMessage("Give me a quick quiz question to test my understanding of what we just discussed!");
  }, [sendMessage]);

  const clearChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      messages: [],
      progress: 0,
    }));
  }, []);

  return {
    ...state,
    setField,
    setSubject,
    setPrepSettings,
    resetToFieldSelection,
    resetToSubjectSelection,
    resetToPrepSettings,
    sendMessage,
    requestReexplain,
    requestQuiz,
    clearChat,
  };
}
