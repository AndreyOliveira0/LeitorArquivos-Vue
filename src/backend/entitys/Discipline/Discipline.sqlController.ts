import { Controller, Post, Body } from '@nestjs/common';
import { DisciplineSQLService } from './Discipline.sqlService'; // Serviço do MySQL

@Controller('DisciplineSQL')
export class DisciplineSQLController {
  constructor(
    private readonly DisciplineSQLService: DisciplineSQLService,
  ) {}

}
