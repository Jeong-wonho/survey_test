import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PetsInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  kind?: string;
}
