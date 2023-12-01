import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class SurveyDto {
  @IsNumber()
  readonly id: number;
  @IsString()
  readonly title: string;
  @IsString()
  readonly content: string;
  @IsBoolean()
  readonly completed: boolean;
}
