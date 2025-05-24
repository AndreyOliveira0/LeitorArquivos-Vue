import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplineModule } from './entitys/Discipline/Discipline.module';
import { ClassModule } from './entitys/Class/Class.module';
import { BondModule } from './entitys/Bond/Bond.module';
import { UserModule } from './entitys/User/User.module';
import { ProcessModule } from './entitys/Process/Process.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || '', {
      dbName: process.env.DB_NAME || 'squad07-Bonsae',
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT || '3307'),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    // Importação dos módulos das entidades
    DisciplineModule,
    ClassModule,
    BondModule,
    UserModule,
    ProcessModule,
    
  ],
  
})
export class AppModule {}
