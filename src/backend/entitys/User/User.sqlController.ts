import { Controller, Post, Get, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserSQLService } from './User.sqlService'; // Serviço do MySQL
import { UserEntity } from './User.sqlEntity';
import { ConcrUserDto } from './User.Dto';
import { UserService } from './User.service';
import { plainToInstance } from 'class-transformer';

@Controller('UserSQL')
export class UserSQLController {
  constructor(
    private readonly UserSQLService: UserSQLService,
    private readonly userService: UserService,
  ) {}

  
  @Post(':Processid')
  //@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async syncMongoToSQL(@Param('Processid') Processid: string): Promise<UserEntity[]> {
    // Busca os dados no MongoDB pelo ID através do MongoController
    const mongoData = await this.userService.findByProcessId(Processid);

    // Transforma os dados usando o DTO
    const formattedData = plainToInstance(ConcrUserDto, mongoData);
    console.log("Função no SQL Controller");
    console.log(formattedData);

    /*
    // Converte o formato de 'matricula' e salva no SQL
    const sqlUsers = formattedData.map(user => {
      return {
        ...user,
        matricula: parseInt(String(user.matricula), 10), // Converte a matrícula para número
      };
    });
    */

    // Insere os dados formatados no SQL usando insertMany
    return this.UserSQLService.insertMany(formattedData);
  }

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.UserSQLService.getAll();
  }

  @Get(':matricula')
  getByMatricula(@Param('matricula') matricula: Number): Promise<UserEntity> {
    return this.UserSQLService.getByMatricula(matricula);
  }
}
