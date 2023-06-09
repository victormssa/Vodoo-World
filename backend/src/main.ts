import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const port = 3000; // Porta do servidor
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
      origin: ['https://vodooworld.vercel.app', 'http://localhost:5173'], // Lista de origens permitidas
      methods: 'GET, POST, PUT, DELETE', // Métodos permitidos
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Cabeçalhos permitidos
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
