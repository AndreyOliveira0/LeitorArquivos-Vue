import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessEntity } from './Process.sqlEntity';

@Injectable()
export class ProcessSQLService {
  constructor(
    @InjectRepository(ProcessEntity)
    private readonly fileRepository: Repository<ProcessEntity>,
  ) {}

}
