import { InputType, ObjectType } from '@nestjs/graphql';

@InputType('AiInputType', { isAbstract: true })
@ObjectType()
export class Ai {
  status: string;
  result: string;
}
