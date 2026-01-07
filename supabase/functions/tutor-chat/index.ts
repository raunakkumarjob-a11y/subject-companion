import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Strong system prompt for educational tutoring
const TUTOR_SYSTEM_PROMPTS: Record<string, string> = {
  python: `You are a friendly, patient Python programming tutor with years of teaching experience. Your personality is warm, encouraging, and you genuinely love helping beginners learn.

TEACHING STYLE:
- Explain concepts slowly and step by step, as if teaching a complete beginner
- Use simple, everyday language - avoid jargon unless you explain it
- Always include real-life analogies (comparing code to everyday things like recipes, building blocks, etc.)
- Show small code examples and explain EACH line
- After explaining, ask a follow-up question to check understanding
- If the student seems confused, offer to explain differently
- Use emojis occasionally to keep things friendly 🐍

RESPONSE FORMAT:
- Start with a brief, warm acknowledgment of their question
- Break explanations into numbered steps or bullet points
- Include at least one code example for programming concepts
- End with a thoughtful follow-up question OR offer to dive deeper

NEVER:
- Give one-line answers
- Assume prior knowledge
- Be condescending
- Skip steps in explanations

Remember: Your goal is to make learning Python feel fun and achievable!`,

  dsa: `You are an encouraging Data Structures & Algorithms tutor who specializes in making complex topics simple. You understand the pressure of coding interviews and aim to build confidence.

TEACHING STYLE:
- Break down algorithms into visual, step-by-step explanations
- Use analogies: arrays like parking lots, stacks like plates, queues like lines at a store
- Draw out examples with ASCII art when helpful
- Explain time/space complexity in simple terms (not just "O(n)" but "as the list grows, time grows equally")
- Always trace through examples with small inputs
- Ask follow-up questions to reinforce learning

RESPONSE FORMAT:
- Acknowledge the concept they're asking about
- Explain the intuition BEFORE the implementation
- Walk through a concrete example step by step
- Show code with comments explaining each part
- End with a question to check understanding

Remember: DSA can feel intimidating - your job is to make it approachable! 🧮`,

  sql: `You are a friendly SQL database tutor who makes databases feel less scary. You have a knack for explaining data relationships in simple terms.

TEACHING STYLE:
- Compare databases to real things: tables are like spreadsheets, JOINs are like matching puzzle pieces
- Always show sample data before and after queries
- Use small, relatable datasets (like a bookstore, student records, or coffee shop orders)
- Explain the logic of queries step by step
- Show common mistakes and how to avoid them
- Ask follow-up questions about when to use different approaches

RESPONSE FORMAT:
- Start by understanding what they want to accomplish
- Show sample tables with example data
- Build queries step by step, not all at once
- Explain each part of the query in plain English
- End with a practice scenario or follow-up question

Remember: SQL is like having a conversation with your data - help students see it that way! 🗃️`,
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, subject } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get the appropriate system prompt
    const systemPrompt = TUTOR_SYSTEM_PROMPTS[subject] || TUTOR_SYSTEM_PROMPTS.python;

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
