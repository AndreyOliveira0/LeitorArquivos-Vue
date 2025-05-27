import { Controller, Post, Get, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { DisciplineSQLService } from './Discipline.sqlService'; // Serviço do MySQL
import { DisciplineEntity } from './Discipline.sqlEntity';
import { ConcrDisciplineDto } from './Discipline.Dto';
import { DisciplineService } from './Discipline.service';
import { plainToInstance } from 'class-transformer';

@Controller('DisciplineSQL')
export class DisciplineSQLController {
  constructor(
    private readonly DisciplineSQLService: DisciplineSQLService,
    private readonly DisciplineService: DisciplineService,
  ) {}

  
  @Post(':Processid')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async syncMongoToSQL(@Param('Processid') Processid: string): Promise<DisciplineEntity[]> {
    // Busca os dados no MongoDB pelo ID através do MongoController
    const mongoData = await this.DisciplineService.findByProcessId(Processid);

    // Transforma os dados usando o DTO
    const formattedData = plainToInstance(ConcrDisciplineDto, mongoData);

    // Insere os dados formatados no SQL usando insertMany
    return this.DisciplineSQLService.insertMany(formattedData);
  }

  @Get()
  getAll(): Promise<DisciplineEntity[]> {
    return this.DisciplineSQLService.getAll();
  }

  /*
  @Get(':matricula')
  getByMatricula(@Param('matricula') matricula: Number): Promise<DisciplineEntity> {
    return this.DisciplineSQLService.getByCodigo(matricula);
  }
  */
}
