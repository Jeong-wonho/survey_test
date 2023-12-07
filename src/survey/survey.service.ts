import { Injectable, NotFoundException } from '@nestjs/common';
import { Survey } from './entities/survey.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyDto } from './dto/create-survey.dto';
import { _ } from 'lodash';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  //   private surveys: Survey[] = [];

  async getAllSurvey() {
    return await this.surveyRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'content', 'completed', 'createdAt', 'updatedAt'],
    });
  }

  async getOneSurvey(id: number) {
    // const survey = this.surveys.find((survey) => survey.id === +id);
    // if (!survey) {
    //   throw new NotFoundException(`This survey with Id ${id} is not found.`);
    // }
    // return survey;
    return await this.surveyRepository.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'title', 'content', 'completed', 'createdAt', 'updatedAt'],
    });
  }

  //정상작동 에러처리 필요!
  createSurvey(surveyData: SurveyDto) {
    // this.surveys.push({
    //   is: this.surveys.length + 1,
    //   ...surveyData,
    // });
    this.surveyRepository.insert(surveyData);
  }

  //정상작동
  updateSurvey(id: number, updateData) {
    const survey = this.getOneSurvey(id);

    if (_.isNil(survey)) {
      throw new NotFoundException(`Survey not found. id: ${id}`);
    }
    this.surveyRepository.update(id, updateData);
  }

  async deleteOneSurvey(id: number) {
    const survey = await this.getOneSurvey(id);
    if (_.isNil(survey)) {
      throw new NotFoundException(`Survey not found. id: ${id}`);
    }

    this.surveyRepository.softDelete(id);
  }

  //completed 서비스 추가 필요.
}
