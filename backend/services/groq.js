const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const analyzeRequest = async (request) => {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AI orchestrator that determines which containers to run based on user requests. ONLY respond with this exact JSON array for data processing tasks: ['data-cleaner', 'data-preprocessor', 'data-normalizer']. Do not include any other text or explanation."
      },
      {
        role: "user",
        content: request
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
  });

  return completion.choices[0].message.content.trim();
};

module.exports = { analyzeRequest }; 