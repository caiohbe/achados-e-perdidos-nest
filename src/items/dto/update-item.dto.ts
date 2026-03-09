import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsOptional()
  @IsNumber()
  usuario_devolvido_id?: number;
}
