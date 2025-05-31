import { IsString, IsDateString, Matches, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class ProcessDto {
@IsString()
    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({ example: '2025-04-23T10:30:00.000Z' })
    periodoInicio?: Date;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({ example: '2025-04-23T10:30:00.000Z' })
    periodoTermino?: Date;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    envioInicio: Date;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({ example: '2025-04-23T10:30:00.000Z' })
    envioTermino?: Date;

    constructor(partial: Partial<ProcessDto> = {}) {
        this.periodoInicio= partial.periodoInicio;

        this.periodoTermino= partial.periodoTermino;

        this.envioInicio= partial.envioInicio ?? new Date();

        this.envioTermino= partial.envioTermino;
    }
}