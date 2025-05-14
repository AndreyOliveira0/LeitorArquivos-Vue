import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BondService } from './Bond.service';
import { Bond } from './Bond.schema'; // Substitua com o seu esquema real
import { BondDto } from './Bond.Dto';

@ApiTags('Bond')
@Controller('Bond')
export class BondController {
  constructor(private readonly BondService: BondService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia um único vínculo' })
  @ApiResponse({ status: 200, description: 'Vínculo Enviado com sucesso.' })
  async create(@Body() data: BondDto): Promise<any> {
    return this.BondService.create(data);
  }

  @Get('Get')
  @ApiOperation({ summary: 'Lista todos os vínculos' })
  @ApiResponse({ status: 200, description: 'Lista de vínculos retornada com sucesso.' })
  async findAll(): Promise<Bond[]> {
    return this.BondService.findAll();
  }

  @Get('Get/:matricula')
  @ApiOperation({ summary: 'Lista um único vínculo' })
  @ApiResponse({ status: 200, description: 'Vínculo retornado com sucesso.' })
  async findUnique(@Param('matricula') matricula: string): Promise<Bond> {
    return this.BondService.findByMatricula(matricula);
  }

  @Put('Put/:matricula')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Atualiza os dados de um único vínculo' })
  @ApiResponse({ status: 200, description: 'Vínculo atualizado com sucesso.' })
  async update(
    @Param('matricula') matricula: string,
    @Body() data: BondDto
  ): Promise<Bond> {
    return this.BondService.update(matricula, data);
  }

  @Put('PutBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBulk(@Body() data: Partial<Bond>[]): Promise<any> {
    return this.BondService.updateBulk(data);
  }

  @Delete('Delete/:matricula')
  @ApiOperation({ summary: 'Deleta um único vínculo' })
  @ApiResponse({ status: 200, description: 'Vínculo deletado com sucesso.' })
  async delete(@Param('matricula') matricula: string): Promise<Bond> {
    return this.BondService.delete(matricula);
  }

}
