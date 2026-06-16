import "dotenv/config";
import { createDeepAgent } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";
import { weatherTool } from "./tools/weatherTool.js"
import { internetSearch } from "./tools/internetSearchTool.js";

const openRouterModel = new ChatOpenAI({
  model: "nex-agi/nex-n2-pro:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

const agent = createDeepAgent({
  model: openRouterModel,
  tools: [weatherTool,internetSearch],
  // Keep the prompt here
  systemPrompt: "Check the tools and according to user query give the correct output by using tools give answer to the point not use extra or idle words",
});

const result = await agent.invoke({
  messages: [
    // REMOVED the system role message from here
    {
      role: "user",
      content: "koorui 24e3 reviews in pakistan?",
    },
  ],
});

console.log(result.messages.at(-1).content);