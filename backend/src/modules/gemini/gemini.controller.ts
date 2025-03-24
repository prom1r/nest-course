import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('openIA')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  getAnswerFromAI(@Body() body: { message: string }) {
    return this.geminiService.getAnswerFromAI({
      message: body.message,
    });
  }
}
