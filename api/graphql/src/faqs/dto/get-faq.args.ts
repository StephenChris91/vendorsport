import { ArgsType } from '@nestjs/graphql';
import { CoreGetArguments } from 'src/common/dto/core-get-arguments.args';

@ArgsType()
export class GetFaqArgs extends CoreGetArguments {
  language?: string;
}
