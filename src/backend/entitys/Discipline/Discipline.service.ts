import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discipline } from './Discipline.schema'; // Substitua com o seu esquema real
import { DisciplineDto } from './Discipline.Dto';

@Injectable()
export class DisciplineService {
  constructor(@InjectModel(Discipline.name) private readonly DisciplineModel: Model<Discipline>) {}

  async create(data: DisciplineDto): Promise<Discipline> {
    return await this.DisciplineModel.create(data);
  }
  
  async insertMany(data: DisciplineDto[]): Promise<Discipline[]> {
    return await this.DisciplineModel.insertMany(data, { ordered: true });
  }
  
  async findByProcessId(processId: string): Promise<Discipline[]> {
    return await this.DisciplineModel.find({processId}).exec();
  }

  async findAll(): Promise<Discipline[]> {
    return this.DisciplineModel.find().exec();
  }

  async findById(codigo: string): Promise<Discipline> {
    const Discipline = await this.DisciplineModel.findById(codigo).exec();
    if (!Discipline) {
      throw new NotFoundException(`Registro com ID ${codigo} não encontrado`);
    }
    return Discipline;
  }

  async findByCodigo(codigo: string): Promise<Discipline> {
  const Discipline = await this.DisciplineModel.findOne({ codigo }).exec();
  if (!Discipline) {
    throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
  }
  return Discipline;
}


  async update(codigo: string, data: DisciplineDto): Promise<Discipline> {
    // Busca o usuário pelo atributo 'codigo'
    const existingDiscipline = await this.DisciplineModel.findOne({ codigo }).exec();
    
    if (!existingDiscipline) {
      throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
    }

    // Atualiza os campos do documento com os novos valores
    Object.assign(existingDiscipline, data);

    // Salva as alterações e retorna o documento atualizado
    return await existingDiscipline.save();
  }

  async updateBulk(data: Partial<Discipline>[]): Promise<any> {
    const operations = data.map(Discipline => {
      if (!Discipline.codigo) return null;

      return {
        updateOne: {
          filter: { codigo: Discipline.codigo },
          update: { $set: Discipline },
          upsert: true
        }
      };
    }).filter(op => op !== null);

    return this.DisciplineModel.bulkWrite(operations);
  }

  async delete(codigo: string): Promise<Discipline> {
    // Busca e remove o usuário pelo atributo 'codigo'
    const deletedDiscipline = await this.DisciplineModel.findOneAndDelete({ codigo }).exec();
    
    if (!deletedDiscipline) {
      throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
    }

    // Retorna o documento excluído
    return deletedDiscipline;
  }


  async deleteByProcessId(processId: string): Promise<{ deletedCount: number }> {
    const result = await this.DisciplineModel.deleteMany({ processId }).exec();
    return { deletedCount: result.deletedCount };
  }
}
