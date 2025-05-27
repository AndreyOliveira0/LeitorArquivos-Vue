import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from './Class.sqlEntity';
import { ClassDto } from './Class.Dto';

@Injectable()
export class ClassSQLService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly fileRepository: Repository<ClassEntity>,
  ) {}

  async createData(data: ClassDto): Promise<ClassEntity> {
    const newData = this.fileRepository.create(data); // Cria a instância da entidade
    return this.fileRepository.save(newData); // Salva a instância no banco de dados
  }

  // Busca todas as linhas
  async getAll(): Promise<ClassEntity[]> {
    return this.fileRepository.find();
  }

  // Busca uma linha pela coluna string
  async getByCodigo(codigo: String): Promise<ClassEntity> {
    const Class = await this.fileRepository.findOneBy({ codigo });
    if (!Class) {
          throw new NotFoundException(`Registro com ID ${codigo} não encontrado`);
        }
        return Class;
  }

  async insertMany(data: Partial<ClassEntity>[]): Promise<ClassEntity[]> {
    // Salva a lista no banco usando o método `save` do TypeORM
    return await this.fileRepository.save(data);
  }
}
