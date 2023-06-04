import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOnline(): string {
    return "<h1>Vodoo World - Pet Shop</h1><br><h2>Status: 200 OK | O Back-End está online e funcional.</h2><br> <h2>Rotas:</h2> <a href='http://localhost:3000/users'><h2>Usuários</h2></a>";
  }
}
