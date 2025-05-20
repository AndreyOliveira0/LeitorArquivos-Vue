import { Controller, Post, Body } from '@nestjs/common';
import { UserSQLService } from './User.sqlService'; // Serviço do MySQL

@Controller('UserSQL')
export class UserSQLController {
  constructor(
    private readonly UserSQLService: UserSQLService,
  ) {}

}
