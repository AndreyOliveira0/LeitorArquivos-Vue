import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User.sqlEntity';
import { UserSQLService } from './User.sqlService';
import { UserSQLController } from './User.sqlController';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserSQLController],
  providers: [UserSQLService],
})
export class UserSQLModule {}
