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
exports.BondDto = void 0;
const class_validator_1 = require("class-validator");
class BondDto {
    constructor(partial = {}) {
        this.nome = partial.nome ?? "";
        this.matricula = partial.matricula ?? 0;
        this.turma = partial.turma ?? "";
        this.disciplina = partial.disciplina ?? "";
        this.papel = partial.papel ?? "";
        this.inicio = partial.inicio ?? new Date();
        this.termino = partial.termino ?? new Date();
        this.obs = partial.obs ?? 0;
        this.status = partial.status ?? "";
    }
}
exports.BondDto = BondDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BondDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BondDto.prototype, "matricula", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BondDto.prototype, "turma", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ0-9\s]+$/, { message: 'Disciplina deve conter apenas letras, números e espaços.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BondDto.prototype, "disciplina", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BondDto.prototype, "papel", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], BondDto.prototype, "inicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], BondDto.prototype, "termino", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BondDto.prototype, "obs", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BondDto.prototype, "status", void 0);
