"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessModule = void 0;
const common_1 = require("@nestjs/common");
const Process_controller_1 = require("./Process.controller");
const Process_service_1 = require("./Process.service");
const mongoose_1 = require("@nestjs/mongoose");
const Process_schema_1 = require("./Process.schema");
let ProcessModule = class ProcessModule {
};
exports.ProcessModule = ProcessModule;
exports.ProcessModule = ProcessModule = __decorate([
    (0, common_1.Module)({
        controllers: [Process_controller_1.ProcessController], // Lista de controladores do módulo
        providers: [Process_service_1.ProcessService], // Lista de provedores (serviços, guardas, etc.)
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Process_schema_1.Process.name, schema: Process_schema_1.ProcessSchema }]),
        ], // Outros módulos que este módulo precisa
        exports: [Process_service_1.ProcessService], // Provedores que podem ser usados por outros módulos
    })
], ProcessModule);
