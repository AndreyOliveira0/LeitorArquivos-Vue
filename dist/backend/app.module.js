"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const Discipline_module_1 = require("./entitys/Discipline/Discipline.module");
const Class_module_1 = require("./entitys/Class/Class.module");
const Bond_module_1 = require("./entitys/Bond/Bond.module");
const User_module_1 = require("./entitys/User/User.module");
const Process_module_1 = require("./entitys/Process/Process.module");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || '', {
                dbName: process.env.DB_NAME || 'squad07-Bonsae',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST || 'localhost',
                port: parseInt(process.env.MYSQL_PORT || '3307'),
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                autoLoadEntities: true,
                synchronize: true,
            }),
            // Importação dos módulos das entidades
            Discipline_module_1.DisciplineModule,
            Class_module_1.ClassModule,
            Bond_module_1.BondModule,
            User_module_1.UserModule,
            Process_module_1.ProcessModule,
        ],
    })
], AppModule);
