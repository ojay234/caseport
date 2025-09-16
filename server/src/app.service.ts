import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCasePort(): string {
    return 'CasePort is running';
  }
}
