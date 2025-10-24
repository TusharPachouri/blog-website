import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);

async function geminiContent(title) {
  // Use your valid model ID here:
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Write a blog post about ${title}. Include a brief introduction, a few paragraphs of content, and a conclusion. Keep it under 150 words. No headings.`;

  const result = await model.generateContent(prompt);

  const content = result.response.candidates[0].content.parts[0].text;

  return content;
}

export { geminiContent };
