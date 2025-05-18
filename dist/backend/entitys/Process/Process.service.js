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
exports.ProcessService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Process_schema_1 = require("./Process.schema"); // Substitua com o seu esquema real
let ProcessService = class ProcessService {
    constructor(ProcessModel) {
        this.ProcessModel = ProcessModel;
    }
    async create(data) {
        const newProcess = new this.ProcessModel(data);
        return await newProcess.save();
    }
    async findAll() {
        return this.ProcessModel.find().exec();
    }
    async findById(_id) {
        const Process = await this.ProcessModel.findById(_id).exec();
        if (!Process) {
            throw new common_1.NotFoundException(`Registro com ID ${_id} não encontrado`);
        }
        return Process;
    }
    async update(_id, data) {
        const existingProcess = await this.ProcessModel.findById(_id).exec();
        if (!existingProcess) {
            throw new common_1.NotFoundException('Registro com ID ${_id} não encontrado');
        }
        Object.assign(existingProcess, data); // Atualiza os campos do documento com os novos valores
        return await existingProcess.save(); // Persiste as alterações, validando os campos automaticamente
    }
    async updateBulk(data) {
        const operations = data.map(Process => {
            if (!Process._id)
                return null;
            return {
                updateOne: {
                    filter: { _id: Process._id },
                    update: { $set: Process },
                    upsert: true
                }
            };
        }).filter(op => op !== null);
        return this.ProcessModel.bulkWrite(operations);
    }
    async delete(_id) {
        const deletedProcess = await this.ProcessModel.findByIdAndDelete(_id).exec();
        if (!deletedProcess) {
            throw new common_1.NotFoundException('Registro com ID ${_id} não encontrado');
        }
        return deletedProcess;
    }
};
exports.ProcessService = ProcessService;
exports.ProcessService = ProcessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Process_schema_1.Process.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProcessService);
