"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BondModule = void 0;
const common_1 = require("@nestjs/common");
const Bond_controller_1 = require("./Bond.controller");
const Bond_service_1 = require("./Bond.service");
const mongoose_1 = require("@nestjs/mongoose");
const Bond_schema_1 = require("./Bond.schema");
let BondModule = class BondModule {
};
exports.BondModule = BondModule;
exports.BondModule = BondModule = __decorate([
    (0, common_1.Module)({
        controllers: [Bond_controller_1.BondController], // Lista de controladores do módulo
        providers: [Bond_service_1.BondService], // Lista de provedores (serviços, guardas, etc.)
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: Bond_schema_1.Bond.name, schema: Bond_schema_1.BondSchema }]),
        ], // Outros módulos que este módulo precisa
        exports: [Bond_service_1.BondService], // Provedores que podem ser usados por outros módulos
    })
], BondModule);
