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
exports.DisciplineSchema = exports.Discipline = void 0;
// Importando os módulos necessários
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Discipline = class Discipline extends mongoose_2.Document {
    constructor(periodo, disciplina, codigo, inicio, termino, categoria, periodoCurricular, estado, campus, status, processId) {
        super();
        this.periodo = periodo;
        this.disciplina = disciplina;
        this.codigo = codigo;
        this.inicio = inicio;
        this.termino = termino;
        this.categoria = categoria;
        this.periodoCurricular = periodoCurricular;
        this.estado = estado;
        this.campus = campus;
        this.status = status;
        this.processId = processId;
    }
};
exports.Discipline = Discipline;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Discipline.prototype, "periodo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Discipline.prototype, "disciplina", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    __metadata("design:type", String)
], Discipline.prototype, "codigo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Discipline.prototype, "inicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Discipline.prototype, "termino", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Discipline.prototype, "categoria", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Discipline.prototype, "periodoCurricular", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Discipline.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Discipline.prototype, "campus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Discipline.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Discipline.prototype, "processId", void 0);
exports.Discipline = Discipline = __decorate([
    (0, mongoose_1.Schema)({ collection: 'Discipline' }),
    __metadata("design:paramtypes", [String, String, String, Date, Date, String, Number, String, String, String, String])
], Discipline);
exports.DisciplineSchema = mongoose_1.SchemaFactory.createForClass(Discipline);
