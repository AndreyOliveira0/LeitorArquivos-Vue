import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BondEntity } from './Bond.sqlEntity';
import { BondDto } from './Bond.Dto';

@Injectable()
export class BondSQLService {
  constructor(
    @InjectRepository(BondEntity)
    private readonly fileRepository: Repository<BondEntity>,
  ) {}

  async createData(data: BondDto): Promise<BondEntity> {
    const newData = this.fileRepository.create(data); // Cria a instância da entidade
    return this.fileRepository.save(newData); // Salva a instância no banco de dados
  }

  // Busca todas as linhas
  async getAll(): Promise<BondEntity[]> {
    return this.fileRepository.find();
  }

  // Busca uma linha pela coluna string
  async getByMatricula(matricula: String): Promise<BondEntity> {
    const bond = await this.fileRepository.findOneBy({ matricula });
    if (!bond) {
          throw new NotFoundException(`Registro com ID ${matricula} não encontrado`);
        }
        return bond;
  }

  async insertMany(data: Partial<BondEntity>[]): Promise<BondEntity[]> {
    // Salva a lista no banco usando o método `save` do TypeORM
    return await this.fileRepository.save(data);
  }
}
