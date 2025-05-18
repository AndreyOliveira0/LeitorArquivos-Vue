import { Module } from '@nestjs/common';
import { ClassController } from './Class.controller';
import { ClassService } from './Class.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './Class.schema';

@Module({
  controllers: [ClassController], // Lista de controladores do módulo
  providers: [ClassService], // Lista de provedores (serviços, guardas, etc.)
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
  ], // Outros módulos que este módulo precisa
  exports: [ClassService], // Provedores que podem ser usados por outros módulos
})
export class ClassModule {}
