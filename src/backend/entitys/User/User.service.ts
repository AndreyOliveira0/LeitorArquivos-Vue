import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User.schema'; // Substitua com o seu esquema real
import { UserDto } from './User.Dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

  async create(data: UserDto): Promise<User> {
    return await this.UserModel.create(data);
  }

  async insertMany(data: UserDto[]): Promise<User[]> {
    return await this.UserModel.insertMany(data, { ordered: true });
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findByProcessId(processId: string): Promise<User[]> {
    return await this.UserModel.find({processId}).exec();
  }

  async findById(matricula: string): Promise<User> {
    const User = await this.UserModel.findById(matricula).exec();
    if (!User) {
      throw new NotFoundException(`Registro com ID ${matricula} não encontrado`);
    }
    return User;
  }

  async findByMatricula(matricula: string): Promise<User> {
    const User = await this.UserModel.findOne({ matricula }).exec();
    if (!User) {
      throw new NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
    }
    return User;
  }


  async update(matricula: string, data: UserDto): Promise<User> {
    // Busca o usuário pelo atributo 'matricula'
    const existingUser = await this.UserModel.findOne({ matricula }).exec();
    
    if (!existingUser) {
      throw new NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
    }

    // Atualiza os campos do documento com os novos valores
    Object.assign(existingUser, data);

    // Salva as alterações e retorna o documento atualizado
    return await existingUser.save();
  }

  async updateBulk(data: Partial<User>[]): Promise<any> {
      const operations = data.map(User => {
        if (!User.matricula) return null;
  
        return {
          updateOne: {
            filter: { matricula: User.matricula },
            update: { $set: User },
            upsert: true
          }
        };
      }).filter(op => op !== null);
  
      return this.UserModel.bulkWrite(operations);
    }

  async delete(matricula: string): Promise<User> {
    // Busca e remove o usuário pelo atributo 'matricula'
    const deletedUser = await this.UserModel.findOneAndDelete({ matricula }).exec();
    
    if (!deletedUser) {
      throw new NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
    }

    // Retorna o documento excluído
    return deletedUser;
  }

  async deleteByProcessId(processId: string): Promise<{ deletedCount: number }> {
    const result = await this.UserModel.deleteMany({ processId }).exec();
    return { deletedCount: result.deletedCount };
  }
}
