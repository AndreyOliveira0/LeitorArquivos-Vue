import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//Configuração dos Bancos
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

//Módulos das Entidades - MongoDB
import { DisciplineModule } from './entitys/Discipline/Discipline.module';
import { ClassModule } from './entitys/Class/Class.module';
import { BondModule } from './entitys/Bond/Bond.module';
import { UserModule } from './entitys/User/User.module';
import { ProcessModule } from './entitys/Process/Process.module';

//Módulos das Entidades - SQL
import { DisciplineSQLModule } from './entitys/Discipline/Discipline.sqlModule';
import { ClassSQLModule } from './entitys/Class/Class.sqlModule';
import { BondSQLModule } from './entitys/Bond/Bond.sqlModule';
import { UserSQLModule } from './entitys/User/User.sqlModule';

//Arquivos 'Entity' das entidades
import { DisciplineEntity } from './entitys/Discipline/Discipline.sqlEntity';
import { ClassEntity } from './entitys/Class/Class.sqlEntity';
import { BondEntity } from './entitys/Bond/Bond.sqlEntity';
import { UserEntity } from './entitys/User/User.sqlEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || '', {
      dbName: process.env.DB_NAME || 'squad07-Bonsae',
    }),

    // Importação dos módulos das entidades - MongoDB
    DisciplineModule,
    ClassModule,
    BondModule,
    UserModule,
    ProcessModule,

    // Conexão com o MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3307'),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [DisciplineEntity, ClassEntity, BondEntity, UserEntity],
      synchronize: true,
    }),
    // Importação dos módulos das entidades - SQL
    DisciplineSQLModule,
    ClassSQLModule,
    BondSQLModule,
    UserSQLModule,
  ],
  
})
export class AppModule {}
