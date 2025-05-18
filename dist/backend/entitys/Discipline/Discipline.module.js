"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplineModule = void 0;
const common_1 = require("@nestjs/common");
const Discipline_controller_1 = require("./Discipline.controller");
const Discipline_service_1 = require("./Discipline.service");
const mongoose_1 = require("@nestjs/mongoose");
const Discipline_schema_1 = require("./Discipline.schema");
let DisciplineModule = class DisciplineModule {
};
exports.DisciplineModule = DisciplineModule;
exports.DisciplineModule = DisciplineModule = __decorate([
    (0, common_1.Module)({
        controllers: [Discipline_controller_1.DisciplineController], // Lista de controladores do módulo
        providers: [Discipline_service_1.DisciplineService], // Lista de provedores (serviços, guardas, etc.)
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Discipline_schema_1.Discipline.name, schema: Discipline_schema_1.DisciplineSchema }]),
        ], // Outros módulos que este módulo precisa
        exports: [Discipline_service_1.DisciplineService], // Provedores que podem ser usados por outros módulos
    })
], DisciplineModule);
