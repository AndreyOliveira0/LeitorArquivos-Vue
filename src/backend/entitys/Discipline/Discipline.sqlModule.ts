import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineEntity } from './Discipline.sqlEntity';
import { DisciplineSQLService } from './Discipline.sqlService';
import { DisciplineSQLController } from './Discipline.sqlController';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineEntity])],
  controllers: [DisciplineSQLController],
  providers: [DisciplineSQLService],
})
export class DisciplineSQLModule {}
