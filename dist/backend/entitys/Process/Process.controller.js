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
exports.ProcessController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Process_service_1 = require("./Process.service");
const Process_Dto_1 = require("./Process.Dto");
let ProcessController = class ProcessController {
    constructor(ProcessService) {
        this.ProcessService = ProcessService;
    }
    async create(data) {
        return this.ProcessService.create(data);
    }
    async findAll() {
        return this.ProcessService.findAll();
    }
    async findUnique(id) {
        return this.ProcessService.findById(id);
    }
    async update(id, data) {
        return this.ProcessService.update(id, data);
    }
    async updateBulk(data) {
        return this.ProcessService.updateBulk(data);
    }
    async delete(id) {
        return this.ProcessService.delete(id);
    }
};
exports.ProcessController = ProcessController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia um único processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Processo Enviado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Process_Dto_1.ProcessDto]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('Get'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os processos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de processos retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('Get/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista um único processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Processo retornado com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "findUnique", null);
__decorate([
    (0, common_1.Put)('Put/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de um único processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Processo atualizado com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Process_Dto_1.ProcessDto]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('PutBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "updateBulk", null);
__decorate([
    (0, common_1.Delete)('Delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta um único processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Processo deletado com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessController.prototype, "delete", null);
exports.ProcessController = ProcessController = __decorate([
    (0, swagger_1.ApiTags)('Process'),
    (0, common_1.Controller)('Process'),
    __metadata("design:paramtypes", [Process_service_1.ProcessService])
], ProcessController);
