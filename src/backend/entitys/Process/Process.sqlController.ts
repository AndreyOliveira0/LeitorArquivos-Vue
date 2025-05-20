import { Controller, Post, Body } from '@nestjs/common';
import { ProcessSQLService } from './Process.sqlService'; // Serviço do MySQL

@Controller('ProcesSQL')
export class ProcessSQLController {
  constructor(
    private readonly ProcessSQLService: ProcessSQLService,
  ) {}

}
