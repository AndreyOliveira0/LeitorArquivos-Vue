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
exports.UserSchema = exports.User = void 0;
// Importando os módulos necessários
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let User = class User extends mongoose_2.Document {
    constructor(nome, matricula, email, curso, tipo, nascimento, cadastro, contato, status, processId) {
        super();
        this.nome = nome;
        this.matricula = matricula;
        this.email = email;
        this.curso = curso;
        this.tipo = tipo;
        this.nascimento = nascimento;
        this.cadastro = cadastro;
        this.contato = contato;
        this.status = status;
        this.processId = processId;
    }
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], User.prototype, "matricula", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "curso", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], User.prototype, "nascimento", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], User.prototype, "cadastro", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "contato", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "processId", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ collection: 'User' }),
    __metadata("design:paramtypes", [String, String, String, String, String, Date, Date, String, String, String])
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
