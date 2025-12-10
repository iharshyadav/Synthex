"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { codeCorrectionPrompt } from "constants/correctCodePrompt";

export async function* codeCorrectionResponseStream(code: any, error: any) {
  try {
    if (!process.env.GOOGLE_GEMINI_KEY) {
      throw new Error('GOOGLE_GEMINI_KEY is not defined in environment variables');
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: codeCorrectionPrompt
    });

    const prompt = `Code:\n${code}\n\nError:\n${error}`;
    const result = await model.generateContentStream(prompt);
    
    for await (const chunk of result.stream) {
      const text = chunk.text();
      console.log(text)
      yield text;
    }
  } catch (error) {
    console.error("Error generating response:", error);
    yield "Error generating response";
  }
}
