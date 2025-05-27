import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BondDto {  
    @IsString()
    @ApiProperty({ example: 'Nícolas de Azevedo' })
    nome: String;

    @Matches(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' })
    @IsString()
    @ApiProperty({ example: '1597326' })
    matricula: String;

    @IsString()
    @ApiProperty({ example: 'N03' })
    turma: String;

    @Matches(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' })
    @IsString()
    @ApiProperty({ example: 'Legislação' })
    disciplina: String;

    @IsString()
    @ApiProperty({ example: 'Aluno' })
    papel: String;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    inicio: Date;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    termino: Date;

    @IsNumber()
    @ApiProperty({ example: '15326849' })
    obs: Number;

    @IsString()
    @ApiProperty({ example: 'Finalizada' })
    status: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @ApiProperty({ example: 'e3e03e39ie3jroefj484fd5gd84' })
    processId: String;

    constructor(partial: Partial<BondDto> = {}) { 
        this.nome= partial.nome ?? "";

        this.matricula= partial.matricula ?? "";
    
        this.turma= partial.turma ?? "";
    
        this.disciplina= partial.disciplina ?? "";
    
        this.papel= partial.papel ?? "";
    
        this.inicio= partial.inicio ?? new Date()
    
        this.termino= partial.termino ?? new Date()
    
        this.obs= partial.obs ?? 0;
    
        this.status= partial.status ?? "";

        this.processId= partial.processId ?? "";
    }
}

export class ConcrBondDto extends BondDto {}