import { Controller, Post, Get, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ClassSQLService } from './Class.sqlService'; // Serviço do MySQL
import { ClassEntity } from './Class.sqlEntity';
import { ConcrClassDto } from './Class.Dto';
import { ClassService } from './Class.service';
import { plainToInstance } from 'class-transformer';

@Controller('ClassSQL')
export class ClassSQLController {
  constructor(
    private readonly ClassSQLService: ClassSQLService,
    private readonly ClassService: ClassService,
  ) {}

  
  @Post(':Processid')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia uma lista de turmas' })
  @ApiResponse({ status: 200, description: 'Turmas enviadas com sucesso.' })
  async syncMongoToSQL(@Param('Processid') Processid: string): Promise<ClassEntity[]> {
    // Busca os dados no MongoDB pelo ID através do MongoController
    const mongoData = await this.ClassService.findByProcessId(Processid);

    // Transforma os dados usando o DTO
    const formattedData = plainToInstance(ConcrClassDto, mongoData);


    // Insere os dados formatados no SQL usando insertMany
    return this.ClassSQLService.insertMany(formattedData);
  }

  @Get()
  @ApiOperation({ summary: 'Recebe todas as turmas' })
  @ApiResponse({ status: 200, description: 'Turmas recebidas com sucesso.' })
  getAll(): Promise<ClassEntity[]> {
    return this.ClassSQLService.getAll();
  }
  
  /*
  @Get(':matricula')
  getByMatricula(@Param('matricula') matricula: Number): Promise<ClassEntity> {
    return this.ClassSQLService.getByMatricula(matricula);
  }
    */
}
