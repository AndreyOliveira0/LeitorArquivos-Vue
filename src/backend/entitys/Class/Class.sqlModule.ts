import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './Class.sqlEntity';
import { ClassSQLService } from './Class.sqlService';
import { ClassSQLController } from './Class.sqlController';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  controllers: [ClassSQLController],
  providers: [ClassSQLService],
})
export class ClassSQLModule {}
