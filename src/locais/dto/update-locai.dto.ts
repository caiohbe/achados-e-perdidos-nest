import { PartialType } from '@nestjs/mapped-types';
import { CreateLocaisDto } from './create-locai.dto';

export class UpdateLocaisDto extends PartialType(CreateLocaisDto) {}
