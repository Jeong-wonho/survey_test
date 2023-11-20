import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';

@Controller('survey')
export class SurveyController {
  constructor(readonly surveyService: SurveyService) {}

  @Get()
  getAllSurvey(): Survey[] {
    return this.surveyService.getAllSurvey();
  }

  @Get('/:id')
  getOneSurvey(@Param('id') surveyId: number): Survey {
    return this.surveyService.getOneSurvey(surveyId);
  }

  /**
   * 완료된 설문조사 가져오는 controller
   * Get('/:id')
   * getCompletedSurvey(): Survey[] {}
   */

  @Post()
  createSurvey(@Body() surveyData) {
    return this.surveyService.createSurvey(surveyData);
  }

  @Delete('/:id')
  deleteSurvey(@Param('id') surveyId: number) {
    return this.surveyService.deleteOneSurvey(surveyId);
  }

  @Patch('/:id')
  updateSurvey(@Param('id') surveyId: number, @Body() updateData) {
    return this.surveyService.updateSurvey(surveyId, updateData);
  }
}
