import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pets } from './pets.entity';
import { PetsService } from './pets.service';
import { PetsInput } from './pets.input';

@Resolver(() => Pets)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Query(() => [Pets])
  async pets(): Promise<Pets[]> {
    return this.petsService.findAll();
  }

  //mutation add+
  @Mutation(() => Pets)
  create(@Args('petInput') petsInput: PetsInput): Promise<Pets> {
    return this.petsService.create(petsInput);
  }
}
