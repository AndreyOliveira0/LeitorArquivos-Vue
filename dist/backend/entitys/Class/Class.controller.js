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
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Class_service_1 = require("./Class.service");
const Class_Dto_1 = require("./Class.Dto");
let ClassController = class ClassController {
    constructor(ClassService) {
        this.ClassService = ClassService;
    }
    async create(data) {
        return this.ClassService.create(data);
    }
    async insertMany(data) {
        return this.ClassService.insertMany(data);
    }
    async findAll() {
        return this.ClassService.findAll();
    }
    async findUnique(codigo) {
        return this.ClassService.findByCodigo(codigo);
    }
    async findByProcessId(processId) {
        return this.ClassService.findByProcessId(processId);
    }
    async update(codigo, data) {
        return this.ClassService.update(codigo, data);
    }
    async updateBulk(data) {
        return this.ClassService.updateBulk(data);
    }
    async delete(codigo) {
        return this.ClassService.delete(codigo);
    }
    async deleteByProcessId(processId) {
        return this.ClassService.deleteByProcessId(processId);
    }
};
exports.ClassController = ClassController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia uma única turma' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turma Enviado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Class_Dto_1.ClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('PostBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia várias turmas em um array' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turmas Enviadas com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "insertMany", null);
__decorate([
    (0, common_1.Get)('Get'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as turmas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de turmas retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('Get/:codigo'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista uma única turma' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turma retornada com sucesso.' }),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findUnique", null);
__decorate([
    (0, common_1.Get)('GetByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as turmas relacionadas a um processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turmas retornadas com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "findByProcessId", null);
__decorate([
    (0, common_1.Put)('Put/:codigo'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de uma única turma' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turma atualizada com sucesso.' }),
    __param(0, (0, common_1.Param)('codigo')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Class_Dto_1.ClassDto]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('PutBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "updateBulk", null);
__decorate([
    (0, common_1.Delete)('Delete/:codigo'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta uma única turma' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turma deletada com sucesso.' }),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('DeleteByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta todas as turmas com o processId especificado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Turmas deletadas com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "deleteByProcessId", null);
exports.ClassController = ClassController = __decorate([
    (0, swagger_1.ApiTags)('Class'),
    (0, common_1.Controller)('Class'),
    __metadata("design:paramtypes", [Class_service_1.ClassService])
], ClassController);
