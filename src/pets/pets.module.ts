import { Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './pets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pets])],
  providers: [PetsResolver, PetsService],
})
export class PetsModule {}
