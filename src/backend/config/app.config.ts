import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class AppConfig {
  // Configurações globais de CORS para o backend
  public getCorsConfig(): CorsOptions {
    return {
      origin: 'http://localhost:8080', // Permite esta origem específica
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
      allowedHeaders: '*', // Cabeçalhos permitidos
      //credentials: true, // Permite cookies e credenciais (opcional)
    };
  }
}
