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
exports.BondController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Bond_service_1 = require("./Bond.service");
const Bond_Dto_1 = require("./Bond.Dto");
let BondController = class BondController {
    constructor(BondService) {
        this.BondService = BondService;
    }
    async create(data) {
        return this.BondService.create(data);
    }
    async insertMany(data) {
        return this.BondService.insertMany(data);
    }
    async findAll() {
        return this.BondService.findAll();
    }
    async findUnique(matricula) {
        return this.BondService.findByMatricula(matricula);
    }
    async findByProcessId(processId) {
        return this.BondService.findByProcessId(processId);
    }
    async update(matricula, data) {
        return this.BondService.update(matricula, data);
    }
    async updateBulk(data) {
        return this.BondService.updateBulk(data);
    }
    async delete(matricula) {
        return this.BondService.delete(matricula);
    }
    async deleteByProcessId(processId) {
        return this.BondService.deleteByProcessId(processId);
    }
};
exports.BondController = BondController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia um único vínculo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vínculo Enviado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Bond_Dto_1.BondDto]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('PostBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia várias usuários em um array' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuários Enviados com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "insertMany", null);
__decorate([
    (0, common_1.Get)('Get'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os vínculos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de vínculos retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BondController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('Get/:matricula'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista um único vínculo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vínculo retornado com sucesso.' }),
    __param(0, (0, common_1.Param)('matricula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "findUnique", null);
__decorate([
    (0, common_1.Get)('GetByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os vínculos relacionados a um processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vínculos retornados com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "findByProcessId", null);
__decorate([
    (0, common_1.Put)('Put/:matricula'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de um único vínculo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vínculo atualizado com sucesso.' }),
    __param(0, (0, common_1.Param)('matricula')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Bond_Dto_1.BondDto]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('PutBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "updateBulk", null);
__decorate([
    (0, common_1.Delete)('Delete/:matricula'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta um único vínculo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vínculo deletado com sucesso.' }),
    __param(0, (0, common_1.Param)('matricula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('DeleteByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta todas os usuários com o processId especificado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuários deletados com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BondController.prototype, "deleteByProcessId", null);
exports.BondController = BondController = __decorate([
    (0, swagger_1.ApiTags)('Bond'),
    (0, common_1.Controller)('Bond'),
    __metadata("design:paramtypes", [Bond_service_1.BondService])
], BondController);
