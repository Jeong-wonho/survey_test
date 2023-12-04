import { Injectable } from '@nestjs/common';
import { Pets } from './pets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetsInput } from './pets.input';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets) private readonly petsRepository: Repository<Pets>,
  ) {}

  //mutation add+
  async create(petInput: PetsInput): Promise<Pets> {
    const newPet = this.petsRepository.create(petInput);
    return this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pets[]> {
    return this.petsRepository.find();
  }
}
