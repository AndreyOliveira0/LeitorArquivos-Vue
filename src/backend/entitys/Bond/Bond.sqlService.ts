import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BondEntity } from './Bond.sqlEntity';

@Injectable()
export class BondSQLService {
  constructor(
    @InjectRepository(BondEntity)
    private readonly fileRepository: Repository<BondEntity>,
  ) {}

  
}
