"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatbotPrompt } from "constants/prompt";

export const chatBotResponse = async (message: string) => {
  try {

    if (!process.env.GOOGLE_GEMINI_KEY) {
      throw new Error('GOOGLE_GEMINI_KEY is not defined in environment variables');
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: chatbotPrompt
    });

    const result = await model.generateContent(message);
    console.log(result.response.text())
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error generating response";
  }
}