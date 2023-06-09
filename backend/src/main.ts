import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from 'cors';

async function bootstrap() {
  try {
    const port = 3000; // Porta do servidor
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const corsOptions: CorsOptions = {
      origin: true, // Permitir solicitações de qualquer origem
      credentials: true, // Permitir o envio de cookies e cabeçalhos de autenticação
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir todos os métodos HTTP
    };
    app.enableCors(corsOptions);

    // Inicialização do servidor
    await app.listen(port);
    console.log(`Status: 200 OK | Server running on http://localhost:${port}/`);

    // Manipulador de sinal para encerrar corretamente o servidor
    process.on('SIGINT', async () => {
      await app.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start the server', error);
  }
}

bootstrap();
