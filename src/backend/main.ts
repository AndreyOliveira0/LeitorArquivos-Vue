import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import mongoose from 'mongoose';

async function bootstrap() {
  try {
    // Inicialização da aplicação NestJS
    Logger.log('Inicializando a aplicação...');
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  
    // Habilitar logs detalhados do Mongoose
    mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true');

    // Configurar CORS para o frontend
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    });
    Logger.log('CORS configurado.');

    // Configuração do Swagger
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('Descrição da API')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    // Inicializa o servidor na porta especificada
    const port = process.env.PORT || 8080;
    await app.listen(port);
    Logger.log(`Servidor iniciado na porta ${port}`);
  } catch (error) {
    Logger.error('Erro durante a inicialização:', error);
  }
}

bootstrap();
