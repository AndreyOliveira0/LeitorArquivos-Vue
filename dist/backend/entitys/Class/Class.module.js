"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModule = void 0;
const common_1 = require("@nestjs/common");
const Class_controller_1 = require("./Class.controller");
const Class_service_1 = require("./Class.service");
const mongoose_1 = require("@nestjs/mongoose");
const Class_schema_1 = require("./Class.schema");
let ClassModule = class ClassModule {
};
exports.ClassModule = ClassModule;
exports.ClassModule = ClassModule = __decorate([
    (0, common_1.Module)({
        controllers: [Class_controller_1.ClassController], // Lista de controladores do módulo
        providers: [Class_service_1.ClassService], // Lista de provedores (serviços, guardas, etc.)
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Class_schema_1.Class.name, schema: Class_schema_1.ClassSchema }]),
        ], // Outros módulos que este módulo precisa
        exports: [Class_service_1.ClassService], // Provedores que podem ser usados por outros módulos
    })
], ClassModule);
