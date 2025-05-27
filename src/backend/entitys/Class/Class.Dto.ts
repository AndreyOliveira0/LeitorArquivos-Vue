import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export abstract class ClassDto {
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Código deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @Expose()
    @ApiProperty({ example: 'f1ds5fsg8sd5' })
    codigo: String;
    
    @IsString()
    @Expose()
    @ApiProperty({ example: 'N03' })
    turma: String;

    @Matches(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' })
    @IsString()
    @Expose()
    @ApiProperty({ example: 'Legislação' })
    disciplina: String;

    @IsString()
    @Expose()
    @ApiProperty({ example: 'Noturno' })
    turno: String;

    @IsNumber()
    @Expose()
    @ApiProperty({ example: '52' })
    capacidade: Number;

    @IsDateString()
    @Expose()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    inicio: Date;

    @IsDateString()
    @Expose()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    termino: Date;

    @IsString()
    @Expose()
    @ApiProperty({ example: 'José Gama da Silva' })
    professor: String;

    @IsString()
    @Expose()
    @ApiProperty({ example: 'Finalizada' })
    status: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @Expose()
    @ApiProperty({ example: 'e3e03e39ie3jroefj484fd5gd84' })
    processId: String;

    constructor(partial: Partial<ClassDto> = {}) {
        this.codigo= partial.codigo ?? "";
        
        this.turma= partial.turma ?? "";
    
        this.disciplina= partial.disciplina ?? "";
    
        this.turno= partial.turno ?? "";
    
        this.capacidade= partial.capacidade ?? 0;
    
        this.inicio= partial.inicio ?? new Date()
    
        this.termino= partial.termino ?? new Date()
    
        this.professor= partial.professor ?? "";
    
        this.status= partial.status ?? "";

        this.processId= partial.processId ?? "";
    }
}

export class ConcrClassDto extends ClassDto {}