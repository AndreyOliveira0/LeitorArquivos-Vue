import { Controller, Post, Body } from '@nestjs/common';
import { BondSQLService } from './Bond.sqlService'; // Serviço do MySQL

@Controller('BondSQL')
export class BondSQLController {
  constructor(
    private readonly BondSQLService: BondSQLService,
  ) {}

}
