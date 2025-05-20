import { IsString, IsDateString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class ProcessDto {
@IsString()
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @ApiProperty({ example: 'e3e03e39ie3jroefj484fd5gd84' })
    id: String;

    @IsString()
    @ApiProperty({ example: '2025/1' })
    periodoInicio: String;

    @IsString()
    @ApiProperty({ example: '2025/2' })
    periodoTermino: String;
    
    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    inicio: Date;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    termino: Date;


    constructor(partial: Partial<ProcessDto> = {}) {
        this.id= partial.id ?? "";

        this.periodoInicio= partial.periodoInicio ?? "";

        this.periodoTermino= partial.periodoTermino ?? "";
    
        this.inicio= partial.inicio ?? new Date()
    
        this.termino= partial.termino ?? new Date();

    }
}