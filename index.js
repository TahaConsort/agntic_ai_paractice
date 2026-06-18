import "dotenv/config";
import { createDeepAgent } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";
import { weatherTool } from "./tools/weatherTool.js";
import { internetSearch } from "./tools/internetSearchTool.js";
import { getPdfText } from "./getTestFromPdf.js";

const openRouterModel = new ChatOpenAI({
  model: "openai/gpt-oss-120b:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

const agent = createDeepAgent({
  model: openRouterModel,
  tools: [weatherTool, internetSearch],
  // Keep the prompt here
  systemPrompt:
    "Check the tools and according to user query give the correct output by using tools give answer to the point not use extra or idle words",
});

const pdfText = await getPdfText();

console.log("PDF loaded");
console.log(pdfText.slice(0, 500));
console.log("Length:", pdfText.length);

const result = await agent.invoke({
  messages: [
    {
      role: "system",
      content: `PDF Content:\n${pdfText}`,
    },
    {
      role: "user",
      content: "Give me summery of the pdf i attached ???",
    },
  ],
});

console.log(result.messages.at(-1).content);
