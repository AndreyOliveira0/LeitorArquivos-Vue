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
exports.DisciplineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Discipline_service_1 = require("./Discipline.service");
const Discipline_Dto_1 = require("./Discipline.Dto");
let DisciplineController = class DisciplineController {
    constructor(DisciplineService) {
        this.DisciplineService = DisciplineService;
    }
    async create(data) {
        return this.DisciplineService.create(data);
    }
    async insertMany(data) {
        return this.DisciplineService.insertMany(data);
    }
    async findAll() {
        return this.DisciplineService.findAll();
    }
    async findByProcessId(processId) {
        return this.DisciplineService.findByProcessId(processId);
    }
    async update(codigo, data) {
        return this.DisciplineService.update(codigo, data);
    }
    async updateBulk(data) {
        return this.DisciplineService.updateBulk(data);
    }
    async delete(codigo) {
        return this.DisciplineService.delete(codigo);
    }
    async deleteByProcessId(processId) {
        return this.DisciplineService.deleteByProcessId(processId);
    }
};
exports.DisciplineController = DisciplineController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia uma única disciplina' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disciplina Enviado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Discipline_Dto_1.DisciplineDto]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('PostBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia várias disciplinas em um array' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disciplinas Enviadas com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "insertMany", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as disciplinas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de disciplinas retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('GetByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as disciplina relacionadas a um processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disciplinas retornadas com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "findByProcessId", null);
__decorate([
    (0, common_1.Put)(':codigo'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de uma única disciplina' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disciplina atualizada com sucesso.' }),
    __param(0, (0, common_1.Param)('codigo')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Discipline_Dto_1.DisciplineDto]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('PutBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "updateBulk", null);
__decorate([
    (0, common_1.Delete)(':codigo'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta uma única disciplina' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disciplina deletada com sucesso.' }),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('DeleteByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta todas as disciplinas com o processId especificado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Disciplinas deletadas com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "deleteByProcessId", null);
exports.DisciplineController = DisciplineController = __decorate([
    (0, swagger_1.ApiTags)('Discipline'),
    (0, common_1.Controller)('Discipline'),
    __metadata("design:paramtypes", [Discipline_service_1.DisciplineService])
], DisciplineController);
