import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User.sqlEntity';
import { UserSQLService } from './User.sqlService';
import { UserSQLController } from './User.sqlController';
import { UserModule } from './User.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
  controllers: [UserSQLController],
  providers: [UserSQLService],
})
export class UserSQLModule {}
