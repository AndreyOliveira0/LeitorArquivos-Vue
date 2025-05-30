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

    constructor(partial: Partial<ProcessDto> = {}) {
        this.id= partial.id ?? "";

        this.periodoInicio= partial.periodoInicio ?? "";

        this.periodoTermino= partial.periodoTermino ?? "";
    }
}