import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Injectable()
export class AppService {
  getOnline(@Res() res: Response): void {
    const filePath = path.join(__dirname, '..', 'index.html');
    res.sendFile(filePath);
  }
}
