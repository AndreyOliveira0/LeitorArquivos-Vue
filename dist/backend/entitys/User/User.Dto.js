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
exports.ConcrUserDto = exports.UserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UserDto {
    constructor(partial = {}) {
        this.nome = partial.nome ?? "";
        this.matricula = partial.matricula ?? "";
        this.email = partial.email ?? "";
        this.curso = partial.curso ?? "";
        this.tipo = partial.tipo ?? "";
        this.nascimento = partial.nascimento ?? new Date();
        this.cadastro = partial.cadastro ?? new Date();
        this.contato = partial.contato ?? "";
        this.status = partial.status ?? "";
        this.processId = partial.processId ?? "";
    }
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], UserDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d{6,12}$/, { message: 'Matrícula deve conter entre 6 e 12 dígitos numéricos.' }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '1597326' }),
    __metadata("design:type", String)
], UserDto.prototype, "matricula", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'E-mail deve estar em um formato válido.' }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'exemplo@gmail.com' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Direito' }),
    __metadata("design:type", String)
], UserDto.prototype, "curso", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Bacharelado' }),
    __metadata("design:type", String)
], UserDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({ example: '2025-04-23T10:30:00.000Z' }),
    __metadata("design:type", Date)
], UserDto.prototype, "nascimento", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({ example: '2025-04-23T10:30:00.000Z' }),
    __metadata("design:type", Date)
], UserDto.prototype, "cadastro", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Contato deve ser um número de telefone válido ou um e-mail válido.' }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '(55) 9878-3948' }),
    __metadata("design:type", String)
], UserDto.prototype, "contato", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'Em Andamento' }),
    __metadata("design:type", String)
], UserDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, { message: 'Id do processo deve conter apenas caracteres alfanuméricos.' }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'e3e03e39ie3jroefj484fd5gd84' }),
    __metadata("design:type", String)
], UserDto.prototype, "processId", void 0);
class ConcrUserDto extends UserDto {
}
exports.ConcrUserDto = ConcrUserDto;
