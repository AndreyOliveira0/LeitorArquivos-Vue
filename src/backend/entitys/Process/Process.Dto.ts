import { IsString, IsDateString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class ProcessDto {
@IsString()
    @Matches(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' })
    @IsString()
    @ApiProperty({ example: 'e3e03e39ie3jroefj484fd5gd84' })
    id: String;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    periodoInicio: Date;

    @IsDateString()
    @ApiProperty({ example: '2025-04-23T10:30:00.000Z' })
    periodoTermino: Date;

    constructor(partial: Partial<ProcessDto> = {}) {
        this.id= partial.id ?? "";

        this.periodoInicio= partial.periodoInicio ?? new Date();

        this.periodoTermino= partial.periodoTermino ?? new Date();
    }
}