import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getOnline(@Res() res: Response): void {
    res.sendFile('index.html', { root: 'public' });
  }
}
