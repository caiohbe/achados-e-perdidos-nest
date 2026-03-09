import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  item: string;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  imagem_URL?: string;

  @IsDate()
  @Type(() => Date)
  data_encontrado: Date;

  @IsNumber()
  local_encontrado_id: number;
}
