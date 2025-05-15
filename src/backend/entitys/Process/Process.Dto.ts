import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class ProcessDto {
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
        this.periodoInicio= partial.periodoInicio ?? "";

        this.periodoTermino= partial.periodoTermino ?? "";
    
        this.inicio= partial.inicio ?? new Date()
    
        this.termino= partial.termino ?? new Date();

    }
}