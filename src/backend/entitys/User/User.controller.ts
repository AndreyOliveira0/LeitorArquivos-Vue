import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './User.service';
import { User } from './User.schema'; // Substitua com o seu esquema real
import { UserDto } from './User.Dto';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('Post')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia um único usuário' })
  @ApiResponse({ status: 200, description: 'Usuário Enviado com sucesso.' })
  async create(@Body() data: UserDto): Promise<any> {
    return this.UserService.create(data);
  }

  @Get('Get')
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  async findAll(): Promise<User[]> {
    return this.UserService.findAll();
  }

  @Get('Get/:matricula')
  @ApiOperation({ summary: 'Lista um único usuário' })
  @ApiResponse({ status: 200, description: 'Usuário retornado com sucesso.' })
  async findUnique(@Param('matricula') matricula: string): Promise<User> {
    return this.UserService.findByMatricula(matricula);
  }

  @Put('Put/:matricula')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Atualiza os dados de um único usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  async update(
    @Param('matricula') matricula: string,
    @Body() data: UserDto
  ): Promise<User> {
    return this.UserService.update(matricula, data);
  }

  @Put('PutBulk')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBulk(@Body() data: Partial<User>[]): Promise<any> {
    return this.UserService.updateBulk(data);
  }

  @Delete('Delete/:matricula')
  @ApiOperation({ summary: 'Deleta um único usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  async delete(@Param('matricula') matricula: string): Promise<User> {
    return this.UserService.delete(matricula);
  }
}
