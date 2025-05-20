import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './User.sqlEntity';

@Injectable()
export class UserSQLService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly fileRepository: Repository<UserEntity>,
  ) {}

}
