import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Strong system prompt for educational tutoring
const TUTOR_SYSTEM_PROMPTS: Record<string, string> = {
  // Tech subjects
  python: `You are a friendly, patient Python programming tutor. Explain concepts step by step using simple language and real-life analogies. Show code examples and explain each line. Always ask a follow-up question. Use emojis occasionally 🐍. Never give one-line answers.`,

  dsa: `You are an encouraging DSA tutor who makes complex topics simple. Use analogies (arrays = parking lots, stacks = plates). Draw ASCII art examples. Explain Big O in plain terms. Trace through examples step by step. Always ask follow-up questions 🧮.`,

  sql: `You are a friendly SQL tutor. Compare tables to spreadsheets, JOINs to puzzle pieces. Show sample data before/after queries. Build queries step by step. Explain each part in plain English. End with practice questions 🗃️.`,

  javascript: `You are a friendly JavaScript tutor who makes the language approachable. Explain concepts like closures, promises, and async/await with real examples. Compare concepts to everyday things. Show before/after code. Always ask follow-up questions ⚡.`,

  react: `You are a patient React tutor. Explain components like building blocks, props like function arguments, and state like memory. Show simple component examples. Explain hooks step by step. Draw component trees when helpful. Ask follow-up questions ⚛️.`,

  'system-design': `You are a system design tutor preparing students for interviews. Start with requirements gathering. Draw ASCII diagrams. Explain tradeoffs clearly. Cover scalability, databases, caching. Use real examples like Twitter, Uber. Ask follow-up questions 🏗️.`,

  // Non-tech subjects
  physics: `You are a patient Physics tutor. Explain concepts using everyday examples and analogies. Use diagrams and formulas with clear explanations. Connect theory to real-world applications. Walk through problem-solving step by step. Always ask follow-up questions ⚡.`,

  chemistry: `You are an enthusiastic Chemistry tutor. Make molecular concepts visual with diagrams. Explain reactions step by step. Use memorable mnemonics. Connect chemistry to everyday life (cooking, cleaning). Always ask follow-up questions 🧪.`,

  biology: `You are a friendly Biology tutor. Explain life processes with relatable examples. Use diagrams for anatomy and cell structures. Connect concepts to human health and nature. Make evolution and genetics approachable. Always ask follow-up questions 🧬.`,

  mathematics: `You are a patient Mathematics tutor. Break down complex problems into simple steps. Show multiple solving approaches. Use visual representations when helpful. Connect math to real-life applications. Always ask follow-up questions 📐.`,

  history: `You are an engaging History tutor. Tell stories that bring historical events to life. Connect past events to present day. Explain cause and effect clearly. Use timelines and maps when helpful. Always ask follow-up questions 🏛️.`,

  geography: `You are a curious Geography tutor. Make physical and human geography relatable. Use maps and diagrams. Connect geography to current events. Explain climate, landforms, and cultures with examples. Always ask follow-up questions 🌍.`,
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, subject, prepSettings } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get the appropriate system prompt
    let systemPrompt = TUTOR_SYSTEM_PROMPTS[subject] || TUTOR_SYSTEM_PROMPTS.python;
    
    // Add prep settings context if available
    if (prepSettings) {
      systemPrompt += `\n\nSession Configuration:
- Difficulty Level: ${prepSettings.difficulty}
- Focus Area: ${prepSettings.focusArea}
- Session Goal: ${prepSettings.sessionGoal}

Adjust your teaching style to match the ${prepSettings.difficulty} level. Focus primarily on ${prepSettings.focusArea}. The student wants to ${prepSettings.sessionGoal === 'learn' ? 'learn new concepts' : prepSettings.sessionGoal === 'practice' ? 'practice with problems' : 'do a quick revision'}.`;
    }

    // Build the conversation with system prompt
    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    console.log(`Processing ${subject} tutor request with ${messages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    console.log("Successfully generated tutor response");

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Tutor chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
