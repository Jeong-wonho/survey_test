import { Injectable, NotFoundException } from '@nestjs/common';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  //type add+ß
  private surveys: Survey[] = [];

  getAllSurvey() {
    return this.surveys;
  }

  getOneSurvey(id: number) {
    const survey = this.surveys.find((survey) => survey.id === +id);
    if (!survey) {
      throw new NotFoundException(`This survey with Id ${id} is not found.`);
    }
    return survey;
  }

  deleteOneSurvey(id: number) {
    this.getOneSurvey(id);
    this.surveys = this.surveys.filter((survey) => survey.id !== +id);
  }

  createSurvey(surveyData) {
    this.surveys.push({
      is: this.surveys.length + 1,
      ...surveyData,
    });
  }

  updateSurvey(id: number, updateData) {
    const survey = this.getOneSurvey(id);
    this.deleteOneSurvey(id);
    this.surveys.push({ ...survey, ...updateData });
  }

  //completed 서비스 추가 필요.
}
