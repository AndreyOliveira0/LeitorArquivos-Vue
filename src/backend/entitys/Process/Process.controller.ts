import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProcessService } from './Process.service';
import { Process } from './Process.schema'; // Substitua com o seu esquema real
import { ProcessDto } from './Process.Dto';

@ApiTags('Process')
@Controller('Process')
export class ProcessController {
  constructor(private readonly ProcessService: ProcessService) {}

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia um único processo' })
  @ApiResponse({ status: 200, description: 'Processo Enviado com sucesso.' })
  async create(@Body() data: ProcessDto): Promise<any> {
    return this.ProcessService.create(data);
  }

  @Get('')
  @ApiOperation({ summary: 'Lista todos os processos' })
  @ApiResponse({ status: 200, description: 'Lista de processos retornada com sucesso.' })
  async findAll(): Promise<Process[]> {
    return this.ProcessService.findAll();
  }

  @Get(':_id')
  @ApiOperation({ summary: 'Lista um único processo' })
  @ApiResponse({ status: 200, description: 'Processo retornado com sucesso.' })
  async findUnique(@Param('_id') id: string): Promise<Process> {
    return this.ProcessService.findById(id);
  }

  @Put(':_id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Atualiza os dados de um único processo' })
  @ApiResponse({ status: 200, description: 'Processo atualizado com sucesso.' })
  async update(
    @Param('_id') id: string,
    @Body() data: ProcessDto
  ): Promise<Process> {
    return this.ProcessService.update(id, data);
  }

  @Delete(':_id')
  @ApiOperation({ summary: 'Deleta um único processo' })
  @ApiResponse({ status: 200, description: 'Processo deletado com sucesso.' })
  async delete(@Param('_id') id: string): Promise<Process> {
    return this.ProcessService.delete(id);
  }

}
