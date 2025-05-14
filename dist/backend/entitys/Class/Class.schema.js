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
exports.ClassSchema = exports.Class = void 0;
// Importando os módulos necessários
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Class = class Class extends mongoose_2.Document {
    constructor(turma, codigo, disciplina, turno, capacidade, inicio, termino, professor, status, processId) {
        super();
        this.turma = turma;
        this.codigo = codigo;
        this.disciplina = disciplina;
        this.turno = turno;
        this.capacidade = capacidade;
        this.inicio = inicio;
        this.termino = termino;
        this.professor = professor;
        this.status = status;
        this.processId = processId;
    }
};
exports.Class = Class;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Class.prototype, "turma", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], Class.prototype, "codigo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Class.prototype, "disciplina", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Class.prototype, "turno", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Class.prototype, "capacidade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Class.prototype, "inicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Class.prototype, "termino", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Class.prototype, "professor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Class.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Class.prototype, "processId", void 0);
exports.Class = Class = __decorate([
    (0, mongoose_1.Schema)({ collection: 'Class' }),
    __metadata("design:paramtypes", [String, String, String, String, Number, Date, Date, String, String, String])
], Class);
exports.ClassSchema = mongoose_1.SchemaFactory.createForClass(Class);
