import "dotenv/config";
import { createDeepAgent } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";

const openRouterModel = new ChatOpenAI({
  model: "nex-agi/nex-n2-pro:free",
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

const agent = createDeepAgent({
  model: openRouterModel,
  // Keep the prompt here
  systemPrompt: "Your strict task is to always say hello on every user query. Do not answer the question, only say hello.",
});

const result = await agent.invoke({
  messages: [
    // REMOVED the system role message from here
    {
      role: "user",
      content: "What is langgraph?",
    },
  ],
});

console.log(result.messages.at(-1).content);