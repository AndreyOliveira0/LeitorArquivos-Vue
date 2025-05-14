import { IsOptional, IsString, IsUUID, IsNotEmpty, IsDate, IsNumber, IsDefined, IsDateString, Matches} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export abstract class DisciplineDto {
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Código deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @ApiProperty({ example: 'asd88a4a5e8f6d2' })
    codigo: String;

    @IsString()
    @ApiProperty({ example: '3°' })
    periodo: String;

    @Matches(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' })
    @IsString()
    @ApiProperty({ example: 'Legislação' })
    disciplina: String;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    inicio: Date;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    termino: Date;

    @IsString()
    @ApiProperty({ example: 'Presencial' })
    categoria: String;

    @IsNumber()
    @ApiProperty({ example: '3°' })
    periodoCurricular: Number;

    @IsString()
    @ApiProperty({ example: 'SE' })
    estado: String;

    @IsString()
    @ApiProperty({ example: 'Aracaju' })
    campus: String;

    @IsString()
    @ApiProperty({ example: 'Em Andamento' })
    status: String;

    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @ApiProperty({ example: 'e3e03e39ie3jroefj484fd5gd84' })
    processId: String;

    constructor(partial: Partial<DisciplineDto> = {}) {
        this.codigo= partial.codigo ?? "";

        this.periodo= partial.periodo ?? "";

        this.disciplina= partial.disciplina ?? "";

    
        this.inicio= partial.inicio ?? new Date()
    
        this.termino= partial.termino ?? new Date()
    
        this.categoria= partial.categoria ?? "";
    
        this.periodoCurricular= partial.periodoCurricular ?? 0;
    
        this.estado= partial.estado ?? "";
    
        this.campus= partial.campus ?? "";
    
        this.status= partial.status ?? "";

        this.processId= partial.processId ?? "";
    }
}