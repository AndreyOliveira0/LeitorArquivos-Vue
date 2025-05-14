import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './Class.schema'; // Substitua com o seu esquema real
import { ClassDto } from './Class.Dto';

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private readonly ClassModel: Model<Class>) {}

  async create(data: ClassDto): Promise<Class> {
    const newClass = new this.ClassModel(data);
    return await newClass.save();
  }

  async findAll(): Promise<Class[]> {
    return this.ClassModel.find().exec();
  }

  async findById(codigo: string): Promise<Class> {
    const Class = await this.ClassModel.findById(codigo).exec();
    if (!Class) {
      throw new NotFoundException(`Registro com id ${codigo} não encontrado`);
    }
    return Class;
  }

  async findByCodigo(codigo: string): Promise<Class> {
  const Class = await this.ClassModel.findOne({ codigo }).exec();
  if (!Class) {
    throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
  }
  return Class;
}


  async update(codigo: string, data: ClassDto): Promise<Class> {
    // Busca o usuário pelo atributo 'codigo'
    const existingClass = await this.ClassModel.findOne({ codigo }).exec();
    
    if (!existingClass) {
      throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
    }

    // Atualiza os campos do documento com os novos valores
    Object.assign(existingClass, data);

    // Salva as alterações e retorna o documento atualizado
    return await existingClass.save();
  }

  async updateBulk(data: Partial<Class>[]): Promise<any> {
      const operations = data.map(Class => {
        if (!Class.codigo) return null;
  
        return {
          updateOne: {
            filter: { codigo: Class.codigo },
            update: { $set: Class },
            upsert: true
          }
        };
      }).filter(op => op !== null);
  
      return this.ClassModel.bulkWrite(operations);
    }

  async delete(codigo: string): Promise<Class> {
    // Busca e remove o usuário pelo atributo 'codigo'
    const deletedClass = await this.ClassModel.findOneAndDelete({ codigo }).exec();
    
    if (!deletedClass) {
      throw new NotFoundException(`Registro com código ${codigo} não encontrado`);
    }

    // Retorna o documento excluído
    return deletedClass;
  }


}
