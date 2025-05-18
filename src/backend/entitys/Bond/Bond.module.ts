import { Module } from '@nestjs/common';
import { BondController } from './Bond.controller';
import { BondService } from './Bond.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bond, BondSchema } from './Bond.schema';

@Module({
  controllers: [BondController], // Lista de controladores do módulo
  providers: [BondService], // Lista de provedores (serviços, guardas, etc.)
  imports: [
    MongooseModule.forFeature([{ name: Bond.name, schema: BondSchema }]),
  ], // Outros módulos que este módulo precisa
  exports: [BondService], // Provedores que podem ser usados por outros módulos
})
export class BondModule {}
