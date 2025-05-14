import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassService } from './Class.service';
import { Class } from './Class.schema'; // Substitua com o seu esquema real
import { ClassDto } from './Class.Dto';

@ApiTags('Class')
@Controller('Class')
export class ClassController {
  constructor(private readonly ClassService: ClassService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia uma única turma' })
  @ApiResponse({ status: 200, description: 'Turma Enviado com sucesso.' })
  async create(@Body() data: ClassDto): Promise<any> {
    return this.ClassService.create(data);
  }

  @Get('Get')
  @ApiOperation({ summary: 'Lista todas as turmas' })
  @ApiResponse({ status: 200, description: 'Lista de turmas retornada com sucesso.' })
  async findAll(): Promise<Class[]> {
    return this.ClassService.findAll();
  }

  @Get('Get/:codigo')
  @ApiOperation({ summary: 'Lista uma única turma' })
  @ApiResponse({ status: 200, description: 'Turma retornada com sucesso.' })
  async findUnique(@Param('codigo') codigo: string): Promise<Class> {
    return this.ClassService.findByCodigo(codigo);
  }

  @Put('Put/:codigo')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Atualiza os dados de uma única turma' })
  @ApiResponse({ status: 200, description: 'Turma atualizada com sucesso.' })
  async update(
    @Param('codigo') codigo: string,
    @Body() data: ClassDto
  ): Promise<Class> {
    return this.ClassService.update(codigo, data);
  }

  @Put('PutBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBulk(@Body() data: Partial<Class>[]): Promise<any> {
    return this.ClassService.updateBulk(data);
  }

  @Delete('Delete/:codigo')
  @ApiOperation({ summary: 'Deleta uma única turma' })
  @ApiResponse({ status: 200, description: 'Turma deletada com sucesso.' })
  async delete(@Param('codigo') codigo: string): Promise<Class> {
    return this.ClassService.delete(codigo);
  }

}
