"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const common_1 = require("@nestjs/common");
let AppConfig = class AppConfig {
    // Configurações globais de CORS para o backend
    getCorsConfig() {
        return {
            origin: 'http://localhost:8080', // Permite esta origem específica
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
            allowedHeaders: '*', // Cabeçalhos permitidos
            //credentials: true, // Permite cookies e credenciais (opcional)
        };
    }
};
exports.AppConfig = AppConfig;
exports.AppConfig = AppConfig = __decorate([
    (0, common_1.Injectable)()
], AppConfig);
