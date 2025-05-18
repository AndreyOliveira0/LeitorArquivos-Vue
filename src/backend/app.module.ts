import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplineModule } from './entitys/Discipline/Discipline.module';
import { ClassModule } from './entitys/Class/Class.module';
import { BondModule } from './entitys/Bond/Bond.module';
import { UserModule } from './entitys/User/User.module';
import { ProcessModule } from './entitys/Process/Process.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || '', {
      dbName: process.env.DB_NAME || 'squad07-Bonsae',
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
