import { PickType } from '@nestjs/swagger';
import { TermsAndConditions } from '../entities/terms-and-conditions.entity';

export class CreateTermsAndConditionsDto extends PickType(TermsAndConditions, [
  'title',
  'description',
]) {}
