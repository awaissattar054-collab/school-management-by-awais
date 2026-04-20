import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeStudentSentiment(teacherRemarks: string) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    // Return mock analysis if no key
    const mockSentiments = ["Positive", "Neutral", "Concerned", "Optimistic"];
    const mockScore = Math.floor(Math.random() * 40) + 60;
    return {
      sentiment: mockSentiments[Math.floor(Math.random() * mockSentiments.length)],
      score: mockScore,
      summary: "Student shows consistent engagement in classroom activities. Peer interaction is high, though focus on mathematics can be improved."
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Analyze the following teacher remarks for student sentiment and performance. Provide a JSON response with 'sentiment' (one word), 'score' (0-100), and a brief 'summary' (max 20 words): "${teacherRemarks}"`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
}
