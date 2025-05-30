import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DisciplineService } from './Discipline.service';
import { Discipline } from './Discipline.schema'; // Substitua com o seu esquema real
import { DisciplineDto } from './Discipline.Dto';

@ApiTags('Discipline')
@Controller('Discipline')
export class DisciplineController {
  constructor(private readonly DisciplineService: DisciplineService) {}

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia uma única disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina Enviado com sucesso.' })
  async create(@Body() data: DisciplineDto): Promise<any> {
    return this.DisciplineService.create(data);
  }

  @Post('PostBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia várias disciplinas em um array' })
  @ApiResponse({ status: 200, description: 'Disciplinas Enviadas com sucesso.' })
  async insertMany(@Body() data: DisciplineDto[]): Promise<any> {
    return this.DisciplineService.insertMany(data);
  }

  @Get('')
  @ApiOperation({ summary: 'Lista todas as disciplinas' })
  @ApiResponse({ status: 200, description: 'Lista de disciplinas retornada com sucesso.' })
  async findAll(): Promise<Discipline[]> {
    return this.DisciplineService.findAll();
  }

  @Get('GetByProcess/:processId')
  @ApiOperation({ summary: 'Lista todas as disciplina relacionadas a um processo' })
  @ApiResponse({ status: 200, description: 'Disciplinas retornadas com sucesso.' })
  async findByProcessId(@Param('processId') processId: string): Promise<Discipline[]> {
    return this.DisciplineService.findByProcessId(processId);
  }

  @Put(':codigo')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Atualiza os dados de uma única disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina atualizada com sucesso.' })
  async update(
    @Param('codigo') codigo: string,
    @Body() data: DisciplineDto
  ): Promise<Discipline> {
    return this.DisciplineService.update(codigo, data);
  }

  @Put('PutBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBulk(@Body() data: Partial<Discipline>[]): Promise<any> {
    return this.DisciplineService.updateBulk(data);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Deleta uma única disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina deletada com sucesso.' })
  async delete(@Param('codigo') codigo: string): Promise<Discipline> {
    return this.DisciplineService.delete(codigo);
  }

  @Delete('DeleteByProcess/:processId')
  @ApiOperation({ summary: 'Deleta todas as disciplinas com o processId especificado' })
  @ApiResponse({ status: 200, description: 'Disciplinas deletadas com sucesso.' })
  async deleteByProcessId(@Param('processId') processId: string): Promise<{ deletedCount: number }> {
    return this.DisciplineService.deleteByProcessId(processId);
  }
}
