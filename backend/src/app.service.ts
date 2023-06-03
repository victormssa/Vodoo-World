import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOnline(): string {
    return 'O Back-End está online!';
  }
}
