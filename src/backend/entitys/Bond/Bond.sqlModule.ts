import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BondEntity } from './Bond.sqlEntity';
import { BondSQLService } from './Bond.sqlService';
import { BondSQLController } from './Bond.sqlController';
import { BondModule } from './Bond.module';

@Module({
  imports: [TypeOrmModule.forFeature([BondEntity]), BondModule],
  controllers: [BondSQLController],
  providers: [BondSQLService],
})
export class BondSQLModule {}
