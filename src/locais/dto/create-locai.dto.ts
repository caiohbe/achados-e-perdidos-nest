import { IsString } from 'class-validator';

export class CreateLocaisDto {
  @IsString()
  nome: string;
}
