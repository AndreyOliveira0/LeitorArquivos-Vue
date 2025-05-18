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
exports.BondSchema = exports.Bond = void 0;
// Importando os módulos necessários
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Bond = class Bond extends mongoose_2.Document {
    constructor(nome, matricula, turma, disciplina, papel, inicio, termino, obs, status, processId) {
        super();
        this.nome = nome;
        this.matricula = matricula;
        this.turma = turma;
        this.disciplina = disciplina;
        this.papel = papel;
        this.inicio = inicio;
        this.termino = termino;
        this.obs = obs;
        this.status = status;
        this.processId = processId;
    }
};
exports.Bond = Bond;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Bond.prototype, "nome", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Bond.prototype, "matricula", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Bond.prototype, "turma", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Bond.prototype, "disciplina", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Bond.prototype, "papel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Bond.prototype, "inicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Bond.prototype, "termino", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Bond.prototype, "obs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Bond.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Bond.prototype, "processId", void 0);
exports.Bond = Bond = __decorate([
    (0, mongoose_1.Schema)({ collection: 'Bond' }),
    __metadata("design:paramtypes", [String, String, String, String, String, Date, Date, Number, String, String])
], Bond);
exports.BondSchema = mongoose_1.SchemaFactory.createForClass(Bond);
