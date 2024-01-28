import { PartialType } from '@nestjs/swagger';
import { CreateTermsAndConditionsDto } from './create-terms-and-conditions.dto';

export class UpdateTermsAndConditionsDto extends PartialType(
  CreateTermsAndConditionsDto,
) {}
