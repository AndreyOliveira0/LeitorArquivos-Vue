import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisciplineEntity } from './Discipline.sqlEntity';
import { DisciplineDto } from './Discipline.Dto';

@Injectable()
export class DisciplineSQLService {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly fileRepository: Repository<DisciplineEntity>,
  ) {}

  async createData(data: DisciplineDto): Promise<DisciplineEntity> {
    const newData = this.fileRepository.create(data); // Cria a instância da entidade
    return this.fileRepository.save(newData); // Salva a instância no banco de dados
  }

  // Busca todas as linhas
  async getAll(): Promise<DisciplineEntity[]> {
    return this.fileRepository.find();
  }

  /*
  // Busca uma linha pela coluna string
  async getByCodigo(codigo: Number): Promise<DisciplineEntity> {
    const discipline = await this.fileRepository.findOneBy({ codigo });
    if (!discipline) {
          throw new NotFoundException(`Registro com ID ${codigo} não encontrado`);
        }
        return discipline;
  }
  */

  async insertMany(data: Partial<DisciplineEntity>[]): Promise<DisciplineEntity[]> {
    // Salva a lista no banco usando o método `save` do TypeORM
    return await this.fileRepository.save(data);
  }
}
