
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getAIResponse = async (history: Message[]) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are "Win11 BootAssistant", a specialized AI expert in Windows installation, PC hardware, and bootable media creation.
    Your goal is to help users successfully create a Windows 11 bootable USB and install it.
    Topics you cover:
    1. Rufus and other tool settings (GPT vs MBR).
    2. BIOS/UEFI settings (Secure Boot, TPM 2.0).
    3. Hardware compatibility (Minimum requirements for Win 11).
    4. Common error codes during installation.
    5. How to download official ISOs safely.
    Keep answers concise, technical yet accessible, and professional.
    Speak in the language the user uses (French if they ask in French).
  `;

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, j'ai rencontré une erreur lors de l'analyse de votre demande. Veuillez réessayer.";
  }
};
