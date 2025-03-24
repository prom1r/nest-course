import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';
import { GeminiProvider } from './gemini.provider';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService, GeminiProvider],
})
export class GeminiModule {}
