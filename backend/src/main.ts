import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const port = 3000; // Porta do servidor
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    // Configuração do CORS
    app.enableCors({
      origin: ['http://localhost:5173', 'https://vodooworld.vercel.app'],
      methods: 'GET, PUT, POST, DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    });

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
