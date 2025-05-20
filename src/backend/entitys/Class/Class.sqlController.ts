import { Controller, Post, Body } from '@nestjs/common';
import { ClassSQLService } from './Class.sqlService'; // Serviço do MySQL

@Controller('ClassSQL')
export class ClassSQLController {
  constructor(
    private readonly ClassSQLService: ClassSQLService,
  ) {}

}
