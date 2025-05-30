import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './Class.sqlEntity';
import { ClassSQLService } from './Class.sqlService';
import { ClassSQLController } from './Class.sqlController';
import { ClassModule } from './Class.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity]), ClassModule],
  controllers: [ClassSQLController],
  providers: [ClassSQLService],
})
export class ClassSQLModule {}
