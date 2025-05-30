import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplineEntity } from './Discipline.sqlEntity';
import { DisciplineSQLService } from './Discipline.sqlService';
import { DisciplineSQLController } from './Discipline.sqlController';
import { DisciplineModule } from './Discipline.module';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineEntity]), DisciplineModule],
  controllers: [DisciplineSQLController],
  providers: [DisciplineSQLService],
})
export class DisciplineSQLModule {}
