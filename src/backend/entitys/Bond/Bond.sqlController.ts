import { Controller, Post, Get, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { BondSQLService } from './Bond.sqlService'; // Serviço do MySQL
import { BondEntity } from './Bond.sqlEntity';
import { ConcrBondDto } from './Bond.Dto';
import { BondService } from './Bond.service';
import { plainToInstance } from 'class-transformer';

@Controller('BondSQL')
export class BondSQLController {
  constructor(
    private readonly BondSQLService: BondSQLService,
    private readonly BondService: BondService,
  ) {}

  
  @Post(':Processid')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async syncMongoToSQL(@Param('Processid') Processid: string): Promise<BondEntity[]> {
    // Busca os dados no MongoDB pelo ID através do MongoController
    const mongoData = await this.BondService.findByProcessId(Processid);

    // Transforma os dados usando o DTO
    const formattedData = plainToInstance(ConcrBondDto, mongoData);

    /*
    // Converte o formato de 'matricula' e salva no SQL
    const sqlBonds = formattedData.map(Bond => {
      return {
        ...Bond,
        matricula: parseInt(String(Bond.matricula), 10), // Converte a matrícula para número
      };
    });
    */

    // Insere os dados formatados no SQL usando insertMany
    return this.BondSQLService.insertMany(formattedData);
  }

  @Get()
  getAll(): Promise<BondEntity[]> {
    return this.BondSQLService.getAll();
  }

  @Get(':matricula')
  getByMatricula(@Param('matricula') matricula: String): Promise<BondEntity> {
    return this.BondSQLService.getByMatricula(matricula);
  }
}
