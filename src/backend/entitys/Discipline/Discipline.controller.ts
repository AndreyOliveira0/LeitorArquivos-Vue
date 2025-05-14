import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DisciplineService } from './Discipline.service';
import { Discipline } from './Discipline.schema'; // Substitua com o seu esquema real
import { DisciplineDto } from './Discipline.Dto';

@ApiTags('Discipline')
@Controller('Discipline')
export class DisciplineController {
  constructor(private readonly DisciplineService: DisciplineService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia uma única disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina Enviado com sucesso.' })
  async create(@Body() data: DisciplineDto): Promise<any> {
    return this.DisciplineService.create(data);
  }

  @Get('Get')
  @ApiOperation({ summary: 'Lista todas as disciplinas' })
  @ApiResponse({ status: 200, description: 'Lista de disciplinas retornada com sucesso.' })
  async findAll(): Promise<Discipline[]> {
    return this.DisciplineService.findAll();
  }

  @Get('Get/:codigo')
  @ApiOperation({ summary: 'Lista uma única disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina retornada com sucesso.' })
  async findUnique(@Param('codigo') codigo: string): Promise<Discipline> {
    return this.DisciplineService.findByCodigo(codigo);
  }

  @Put('Put/:codigo')
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

  @Delete('Delete/:codigo')
  @ApiOperation({ summary: 'Deleta uma única disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina deletada com sucesso.' })
  async delete(@Param('codigo') codigo: string): Promise<Discipline> {
    return this.DisciplineService.delete(codigo);
  }

}
