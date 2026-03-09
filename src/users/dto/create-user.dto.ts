import { Transform } from 'class-transformer';
import { IsEmail, IsNumberString, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;

  @Transform(({ value }) =>
    typeof value == 'string' ? value.replace(/\D/g, '') : value,
  )
  @Length(11, 11, { message: 'O CPF deve ter 11 dígitos' })
  @IsNumberString({}, { message: 'O CPF deve conter apenas números.' })
  @IsString({ message: 'O CPF deve ser uma string.' })
  cpf: string;

  @IsEmail({}, { message: 'Email inválido.' })
  @IsString({ message: 'Email deve ser uma string.' })
  email: string;
}
