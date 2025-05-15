"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("./User.schema"); // Substitua com o seu esquema real
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async create(data) {
        return await this.UserModel.create(data);
    }
    async insertMany(data) {
        return await this.UserModel.insertMany(data, { ordered: true });
    }
    async findAll() {
        return this.UserModel.find().exec();
    }
    async findByProcessId(processId) {
        return await this.UserModel.find({ processId }).exec();
    }
    async findById(matricula) {
        const User = await this.UserModel.findById(matricula).exec();
        if (!User) {
            throw new common_1.NotFoundException(`Registro com ID ${matricula} não encontrado`);
        }
        return User;
    }
    async findByMatricula(matricula) {
        const User = await this.UserModel.findOne({ matricula }).exec();
        if (!User) {
            throw new common_1.NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
        }
        return User;
    }
    async update(matricula, data) {
        // Busca o usuário pelo atributo 'matricula'
        const existingUser = await this.UserModel.findOne({ matricula }).exec();
        if (!existingUser) {
            throw new common_1.NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
        }
        // Atualiza os campos do documento com os novos valores
        Object.assign(existingUser, data);
        // Salva as alterações e retorna o documento atualizado
        return await existingUser.save();
    }
    async updateBulk(data) {
        const operations = data.map(User => {
            if (!User.matricula)
                return null;
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
    async delete(matricula) {
        // Busca e remove o usuário pelo atributo 'matricula'
        const deletedUser = await this.UserModel.findOneAndDelete({ matricula }).exec();
        if (!deletedUser) {
            throw new common_1.NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
        }
        // Retorna o documento excluído
        return deletedUser;
    }
    async deleteByProcessId(processId) {
        const result = await this.UserModel.deleteMany({ processId }).exec();
        return { deletedCount: result.deletedCount };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
