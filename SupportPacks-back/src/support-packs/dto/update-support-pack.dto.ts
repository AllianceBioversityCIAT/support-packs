import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportPackDto } from './create-support-pack.dto';

export class UpdateSupportPackDto extends PartialType(CreateSupportPackDto) {}
