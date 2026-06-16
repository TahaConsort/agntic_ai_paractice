import { tool } from "langchain";
import { z } from "zod";

export const weatherTool = tool(
  async ({ city }) => {
    try {
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(city)}?format=j1`
      );

      const data = await response.json();

      const current = data.current_condition?.[0];

      return JSON.stringify({
        city,
        temperature: `${current.temp_C}°C`,
        feelsLike: `${current.FeelsLikeC}°C`,
        humidity: `${current.humidity}%`,
        windSpeed: `${current.windspeedKmph} km/h`,
        weather: current.weatherDesc?.[0]?.value,
      });
    } catch (error) {
      return `Failed to fetch weather: ${error}`;
    }
  },
  {
    name: "get_current_weather",
    description: "Get current weather information for a city.",
    schema: z.object({
      city: z.string().describe("City name"),
    }),
  }
);