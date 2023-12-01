import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Survey {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  title?: string;

  @Field({ nullable: false })
  content?: string;
}
