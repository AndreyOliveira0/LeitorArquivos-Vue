import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BondService } from './Bond.service';
import { Bond } from './Bond.schema'; // Substitua com o seu esquema real
import { BondDto } from './Bond.Dto';

@ApiTags('Bond')
@Controller('Bond')
export class BondController {
  constructor(private readonly BondService: BondService) {}

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia um único vínculo' })
  @ApiResponse({ status: 200, description: 'Vínculo Enviado com sucesso.' })
  async create(@Body() data: BondDto): Promise<any> {
    return this.BondService.create(data);
  }

  @Post('PostBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia várias usuários em um array' })
  @ApiResponse({ status: 200, description: 'Usuários Enviados com sucesso.' })
  async insertMany(@Body() data: BondDto[]): Promise<any> {
    return this.BondService.insertMany(data);
  }

  @Get('')
  @ApiOperation({ summary: 'Lista todos os vínculos' })
  @ApiResponse({ status: 200, description: 'Lista de vínculos retornada com sucesso.' })
  async findAll(): Promise<Bond[]> {
    return this.BondService.findAll();
  }

  @Get(':matricula')
  @ApiOperation({ summary: 'Lista um único vínculo' })
  @ApiResponse({ status: 200, description: 'Vínculo retornado com sucesso.' })
  async findUnique(@Param('matricula') matricula: string): Promise<Bond> {
    return this.BondService.findByMatricula(matricula);
  }
  
  @Get('GetByProcess/:processId')
  @ApiOperation({ summary: 'Lista todos os vínculos relacionados a um processo' })
  @ApiResponse({ status: 200, description: 'Vínculos retornados com sucesso.' })
  async findByProcessId(@Param('processId') processId: string): Promise<Bond[]> {
    return this.BondService.findByProcessId(processId);
  }

  @Put(':matricula')
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

  @Delete(':matricula')
  @ApiOperation({ summary: 'Deleta um único vínculo' })
  @ApiResponse({ status: 200, description: 'Vínculo deletado com sucesso.' })
  async delete(@Param('matricula') matricula: string): Promise<Bond> {
    return this.BondService.delete(matricula);
  }

  @Delete('DeleteByProcess/:processId')
  @ApiOperation({ summary: 'Deleta todas os usuários com o processId especificado' })
  @ApiResponse({ status: 200, description: 'Usuários deletados com sucesso.' })
  async deleteByProcessId(@Param('processId') processId: string): Promise<{ deletedCount: number }> {
    return this.BondService.deleteByProcessId(processId);
  }
}
