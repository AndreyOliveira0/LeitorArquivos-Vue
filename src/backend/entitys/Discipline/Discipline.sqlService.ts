import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisciplineEntity } from './Discipline.sqlEntity';

@Injectable()
export class DisciplineSQLService {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly fileRepository: Repository<DisciplineEntity>,
  ) {}

}
