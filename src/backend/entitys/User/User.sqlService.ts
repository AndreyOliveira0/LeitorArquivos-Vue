import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './User.sqlEntity';
import { UserDto } from './User.Dto';

@Injectable()
export class UserSQLService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly fileRepository: Repository<UserEntity>,
  ) {}

  async createData(data: UserDto): Promise<UserEntity> {
    const newData = this.fileRepository.create(data); // Cria a instância da entidade
    return this.fileRepository.save(newData); // Salva a instância no banco de dados
  }

  // Busca todas as linhas
  async getAll(): Promise<UserEntity[]> {
    return this.fileRepository.find();
  }

  // Busca uma linha pela coluna string
  async getByMatricula(matricula: String): Promise<UserEntity> {
    const user = await this.fileRepository.findOneBy({ matricula });
    if (!user) {
          throw new NotFoundException(`Registro com ID ${matricula} não encontrado`);
        }
        return user;
  }

  async insertMany(data: Partial<UserEntity>[]): Promise<UserEntity[]> {
    // Salva a lista no banco usando o método `save` do TypeORM
    return await this.fileRepository.save(data);
  }
}
