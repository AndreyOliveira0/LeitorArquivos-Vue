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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcrBondDto = exports.BondDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class BondDto {
    constructor(partial = {}) {
        this.nome = partial.nome ?? "";
        this.matricula = partial.matricula ?? "";
        this.turma = partial.turma ?? "";
        this.disciplina = partial.disciplina ?? "";
        this.papel = partial.papel ?? "";
        this.inicio = partial.inicio ?? new Date();
        this.termino = partial.termino ?? new Date();
        this.obs = partial.obs ?? 0;
        this.status = partial.status ?? "";
        this.processId = partial.processId ?? "";
    }
}
exports.BondDto = BondDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'Nícolas de Azevedo' }),
    __metadata("design:type", String)
], BondDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: '1597326' }),
    __metadata("design:type", String)
], BondDto.prototype, "matricula", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'N03' }),
    __metadata("design:type", String)
], BondDto.prototype, "turma", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'Legislação' }),
    __metadata("design:type", String)
], BondDto.prototype, "disciplina", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'Aluno' }),
    __metadata("design:type", String)
], BondDto.prototype, "papel", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: '2025-04-23T10:30:00.000Z' }),
    __metadata("design:type", Date)
], BondDto.prototype, "inicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: '2025-04-23T10:30:00.000Z' }),
    __metadata("design:type", Date)
], BondDto.prototype, "termino", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: '15326849' }),
    __metadata("design:type", Number)
], BondDto.prototype, "obs", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'Finalizada' }),
    __metadata("design:type", String)
], BondDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'e3e03e39ie3jroefj484fd5gd84' }),
    __metadata("design:type", String)
], BondDto.prototype, "processId", void 0);
class ConcrBondDto extends BondDto {
}
exports.ConcrBondDto = ConcrBondDto;
