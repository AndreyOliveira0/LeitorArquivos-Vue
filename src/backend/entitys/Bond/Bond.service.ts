import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bond } from './Bond.schema'; // Substitua com o seu esquema real
import { BondDto } from './Bond.Dto';

@Injectable()
export class BondService {
  constructor(@InjectModel(Bond.name) private readonly BondModel: Model<Bond>) {}

  async create(data: BondDto): Promise<Bond> {
    const newBond = new this.BondModel(data);
    return await newBond.save();
  }

  async findAll(): Promise<Bond[]> {
    return this.BondModel.find().exec();
  }

  async findById(matricula: string): Promise<Bond> {
    const Bond = await this.BondModel.findById(matricula).exec();
    if (!Bond) {
      throw new NotFoundException(`Registro com ID ${matricula} não encontrado`);
    }
    return Bond;
  }

  async findByMatricula(matricula: string): Promise<Bond> {
  const Bond = await this.BondModel.findOne({ matricula }).exec();
  if (!Bond) {
    throw new NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
  }
  return Bond;
  }


  async update(matricula: string, data: BondDto): Promise<Bond> {
    // Busca o usuário pelo atributo 'matricula'
    const existingBond = await this.BondModel.findOne({ matricula }).exec();
    
    if (!existingBond) {
      throw new NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
    }

    // Atualiza os campos do documento com os novos valores
    Object.assign(existingBond, data);

    // Salva as alterações e retorna o documento atualizado
    return await existingBond.save();
  }

  async updateBulk(data: Partial<Bond>[]): Promise<any> {
    const operations = data.map(bond => {
      if (!bond.matricula) return null;

      return {
        updateOne: {
          filter: { matricula: bond.matricula },
          update: { $set: bond },
          upsert: true
        }
      };
    }).filter(op => op !== null);

    return this.BondModel.bulkWrite(operations);
  }

  async delete(matricula: string): Promise<Bond> {
    // Busca e remove o usuário pelo atributo 'matricula'
    const deletedBond = await this.BondModel.findOneAndDelete({ matricula }).exec();
    
    if (!deletedBond) {
      throw new NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
    }

    // Retorna o documento excluído
    return deletedBond;
  }


}
