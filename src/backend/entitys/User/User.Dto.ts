import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class UserDto {
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  nome: String;

  @Matches(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' })
  @IsString()
  @ApiProperty({ example: '1597326' })
  matricula: String;

  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'E-mail deve estar em um formato válido.' })
  @IsString()
  @ApiProperty({ example: 'exemplo@gmail.com' })
  email: String;

  @IsString()
  @ApiProperty({ example: 'Direito' })
  curso: String;

  @IsString()
  @ApiProperty({ example: 'Bacharelado' })
  tipo: String;

  @IsDateString()
  @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
  nascimento: Date;

  @IsDateString()
  @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
  cadastro: Date;

  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Contato deve ser um número de telefone válido ou um e-mail válido.' })
  @IsString()
  @ApiProperty({ example: '(55) 9878-3948' })
  contato: String;

  @IsString()
  @ApiProperty({ example: 'Em Andamento' })
  status: String;

  @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
  @IsString()
  @ApiProperty({ example: 'e3e03e39ie3jroefj484fd5gd84' })
  processId: String;

  constructor(partial: Partial<UserDto> = {}) {
    this.nome= partial.nome ?? "";

    this.matricula= partial.matricula ?? "";

    this.email= partial.email ?? "";

    this.curso= partial.curso ?? "";

    this.tipo= partial.tipo ?? "";

    this.nascimento= partial.nascimento ?? new Date()

    this.cadastro= partial.cadastro ?? new Date()

    this.contato= partial.contato ?? "";

    this.status= partial.status ?? "";  
    
    this.processId= partial.processId ?? "";    

  }
}

export class ConcrUserDto extends UserDto {}