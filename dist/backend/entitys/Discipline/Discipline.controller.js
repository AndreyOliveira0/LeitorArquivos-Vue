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
const Discipline_service_1 = require("./Discipline.service");
const Discipline_Dto_1 = require("./Discipline.Dto");
let DisciplineController = class DisciplineController {
    constructor(DisciplineService) {
        this.DisciplineService = DisciplineService;
    }
    async create(data) {
        return this.DisciplineService.create(data);
    }
    async findAll() {
        return this.DisciplineService.findAll();
    }
    async findUnique(codigo) {
        return this.DisciplineService.findByCodigo(codigo);
    }
    async update(codigo, data) {
        return this.DisciplineService.update(codigo, data);
    }
    async delete(codigo) {
        return this.DisciplineService.delete(codigo);
    }
};
exports.DisciplineController = DisciplineController;
__decorate([
    (0, common_1.Post)('Post'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Discipline_Dto_1.DisciplineDto]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('Get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('Get/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "findUnique", null);
__decorate([
    (0, common_1.Put)('Put/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Discipline_Dto_1.DisciplineDto]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('Delete/:codigo'),
    __param(0, (0, common_1.Param)('codigo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DisciplineController.prototype, "delete", null);
exports.DisciplineController = DisciplineController = __decorate([
    (0, common_1.Controller)('Discipline'),
    __metadata("design:paramtypes", [Discipline_service_1.DisciplineService])
], DisciplineController);
