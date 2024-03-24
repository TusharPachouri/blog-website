import { GoogleGenerativeAI } from "@google/generative-ai";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);

async function geminiContent(title) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt =
    "Write a blog post about " +
    title +
    ". " +
    "Include a brief introduction, a few paragraphs of content, and a conclusion." +
    "in 100 - 150 words you don't have to include any title just write the content. (No heading required)";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let content = response.text();
  content = content.replace(/\*\*(.*?)\*\*/g, "<h2>$1</h2>");
  // console.log(content);
  return content;
}
// geminiContent("How to make a website")

export { geminiContent };
