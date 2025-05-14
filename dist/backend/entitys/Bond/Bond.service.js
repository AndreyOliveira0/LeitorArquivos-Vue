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
exports.BondService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Bond_schema_1 = require("./Bond.schema"); // Substitua com o seu esquema real
let BondService = class BondService {
    constructor(BondModel) {
        this.BondModel = BondModel;
    }
    async create(data) {
        const newBond = new this.BondModel(data);
        return await newBond.save();
    }
    async findAll() {
        return this.BondModel.find().exec();
    }
    async findById(matricula) {
        const Bond = await this.BondModel.findById(matricula).exec();
        if (!Bond) {
            throw new common_1.NotFoundException(`Registro com ID ${matricula} não encontrado`);
        }
        return Bond;
    }
    async findByMatricula(matricula) {
        const Bond = await this.BondModel.findOne({ matricula }).exec();
        if (!Bond) {
            throw new common_1.NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
        }
        return Bond;
    }
    async update(matricula, data) {
        // Busca o usuário pelo atributo 'matricula'
        const existingBond = await this.BondModel.findOne({ matricula }).exec();
        if (!existingBond) {
            throw new common_1.NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
        }
        // Atualiza os campos do documento com os novos valores
        Object.assign(existingBond, data);
        // Salva as alterações e retorna o documento atualizado
        return await existingBond.save();
    }
    async updateBulk(data) {
        const operations = data.map(bond => {
            if (!bond.matricula)
                return null;
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
    async delete(matricula) {
        // Busca e remove o usuário pelo atributo 'matricula'
        const deletedBond = await this.BondModel.findOneAndDelete({ matricula }).exec();
        if (!deletedBond) {
            throw new common_1.NotFoundException(`Registro com matrícula ${matricula} não encontrado`);
        }
        // Retorna o documento excluído
        return deletedBond;
    }
};
exports.BondService = BondService;
exports.BondService = BondService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Bond_schema_1.Bond.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BondService);
