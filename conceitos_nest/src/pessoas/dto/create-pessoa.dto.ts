import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePessoaDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password!: string;

  @IsString()
  @IsNotEmpty()
  nome!: string;
}
