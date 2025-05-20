import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from './Class.sqlEntity';

@Injectable()
export class ClassSQLService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly fileRepository: Repository<ClassEntity>,
  ) {}

}
