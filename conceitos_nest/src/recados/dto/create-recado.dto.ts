import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  // Encontrar a pessoa que está criando o recado
  // Encontrar a pessoa para quem o recado está sendo enviado

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text!: string;

  @IsPositive()
  deId!: number;

  @IsPositive()
  paraId!: number;
}
