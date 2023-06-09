import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    const port = 3000; // Porta do servidor
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    app.enableCors(); // Habilitar CORS

    // Definir cabeçalhos 'Access-Control-Allow-Origin' e 'Access-Control-Allow-Methods' na resposta
    app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Origin',
        'https://vodooworld.vercel.app, http://localhost:5173',
      );
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      next();
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
