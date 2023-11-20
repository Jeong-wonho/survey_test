import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyController } from './survey/survey.controller';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [SurveyModule],
  controllers: [AppController, SurveyController],
  providers: [AppService],
})
export class AppModule {}
