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
exports.DisciplineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Discipline_schema_1 = require("./Discipline.schema"); // Substitua com o seu esquema real
let DisciplineService = class DisciplineService {
    constructor(DisciplineModel) {
        this.DisciplineModel = DisciplineModel;
    }
    async create(data) {
        return await this.DisciplineModel.create(data);
    }
    async insertMany(data) {
        return await this.DisciplineModel.insertMany(data, { ordered: true });
    }
    async findByProcessId(processId) {
        return await this.DisciplineModel.find({ processId }).exec();
    }
    async findAll() {
        return this.DisciplineModel.find().exec();
    }
    async findById(codigo) {
        const Discipline = await this.DisciplineModel.findById(codigo).exec();
        if (!Discipline) {
            throw new common_1.NotFoundException(`Registro com ID ${codigo} não encontrado`);
        }
        return Discipline;
    }
    async findByCodigo(codigo) {
        const Discipline = await this.DisciplineModel.findOne({ codigo }).exec();
        if (!Discipline) {
            throw new common_1.NotFoundException(`Registro com código ${codigo} não encontrado`);
        }
        return Discipline;
    }
    async update(codigo, data) {
        // Busca o usuário pelo atributo 'codigo'
        const existingDiscipline = await this.DisciplineModel.findOne({ codigo }).exec();
        if (!existingDiscipline) {
            throw new common_1.NotFoundException(`Registro com código ${codigo} não encontrado`);
        }
        // Atualiza os campos do documento com os novos valores
        Object.assign(existingDiscipline, data);
        // Salva as alterações e retorna o documento atualizado
        return await existingDiscipline.save();
    }
    async updateBulk(data) {
        const operations = data.map(Discipline => {
            if (!Discipline.codigo)
                return null;
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
    async delete(codigo) {
        // Busca e remove o usuário pelo atributo 'codigo'
        const deletedDiscipline = await this.DisciplineModel.findOneAndDelete({ codigo }).exec();
        if (!deletedDiscipline) {
            throw new common_1.NotFoundException(`Registro com código ${codigo} não encontrado`);
        }
        // Retorna o documento excluído
        return deletedDiscipline;
    }
    async deleteByProcessId(processId) {
        const result = await this.DisciplineModel.deleteMany({ processId }).exec();
        return { deletedCount: result.deletedCount };
    }
};
exports.DisciplineService = DisciplineService;
exports.DisciplineService = DisciplineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Discipline_schema_1.Discipline.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DisciplineService);
