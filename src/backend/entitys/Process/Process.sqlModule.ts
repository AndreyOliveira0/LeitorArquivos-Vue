import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './Process.sqlEntity';
import { ProcessSQLService } from './Process.sqlService';
import { ProcessSQLController } from './Process.sqlController';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessEntity])],
  controllers: [ProcessSQLController],
  providers: [ProcessSQLService],
})
export class ProcessSQLModule {}
