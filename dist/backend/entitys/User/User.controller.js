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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const User_service_1 = require("./User.service");
const User_Dto_1 = require("./User.Dto");
let UserController = class UserController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async create(data) {
        return this.UserService.create(data);
    }
    async insertMany(data) {
        return this.UserService.insertMany(data);
    }
    async findAll() {
        return this.UserService.findAll();
    }
    async findUnique(matricula) {
        return this.UserService.findByMatricula(matricula);
    }
    async findByProcessId(processId) {
        return this.UserService.findByProcessId(processId);
    }
    async update(matricula, data) {
        return this.UserService.update(matricula, data);
    }
    async updateBulk(data) {
        return this.UserService.updateBulk(data);
    }
    async delete(matricula) {
        return this.UserService.delete(matricula);
    }
    async deleteByProcessId(processId) {
        return this.UserService.deleteByProcessId(processId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia um único usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário Enviado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_Dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('PostBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Envia várias usuários em um array' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuários Enviados com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "insertMany", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os usuários' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuários retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':matricula'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista um único usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário retornado com sucesso.' }),
    __param(0, (0, common_1.Param)('matricula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUnique", null);
__decorate([
    (0, common_1.Get)('GetByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os usuários relacionados a um processo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuários retornados com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByProcessId", null);
__decorate([
    (0, common_1.Put)('Put/:matricula'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de um único usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário atualizado com sucesso.' }),
    __param(0, (0, common_1.Param)('matricula')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User_Dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('PutBulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateBulk", null);
__decorate([
    (0, common_1.Delete)('Delete/:matricula'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta um único usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário deletado com sucesso.' }),
    __param(0, (0, common_1.Param)('matricula')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('DeleteByProcess/:processId'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta todas os usuários com o processId especificado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuários deletados com sucesso.' }),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteByProcessId", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('User'),
    __metadata("design:paramtypes", [User_service_1.UserService])
], UserController);
