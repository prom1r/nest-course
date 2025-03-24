import { Injectable } from '@nestjs/common';
import { getPrompt } from './prompt/prompt';
import { GeminiProvider } from './gemini.provider';

@Injectable()
export class GeminiService {
  constructor(private readonly geminiProvider: GeminiProvider) {}
  async getAnswerFromAI(body: { message: string }) {
    const prompt = getPrompt(body);
    const model = this.geminiProvider.getModel();
    const result = await model.generateContent(prompt);

    return result.response.text();
  }
}
