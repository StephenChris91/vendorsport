import { InputType } from '@nestjs/graphql';

@InputType()
export class AiInput {
  prompt: string;
}
