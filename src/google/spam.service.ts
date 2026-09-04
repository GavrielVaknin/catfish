import { Injectable } from '@nestjs/common';
import SpamScanner from 'spamscanner';

@Injectable()
export class SpamService {
  private readonly scanner = new SpamScanner();

  async scan(email: Buffer) {
    return this.scanner.scan(email);
  }
}
