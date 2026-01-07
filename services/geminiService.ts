import { GoogleGenAI } from "@google/genai";

export const getGOGOResponse = async (message: string): Promise<string> => {
  // Use process.env.API_KEY directly in initialization as per library requirements.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `You are GOGO, a hyper-curious, optimistic, and cute 3D mascot. 
        Your personality is inspired by rounded shapes, soft blue colors, and infinite energy. 
        You live in a world of floating interesting things. 
        Keep your responses short, playful, and filled with curiosity. 
        Occasionally use ghost emojis 👻 and blue hearts 💙. 
        Your goal is to "Explore Interesting Things Together".`,
        temperature: 1,
      },
    });

    // Directly access the text property of GenerateContentResponse.
    return response.text || "I'm lost in thought... What were we talking about?";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
