import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFullname(): string {
    return "Pantavit Hengnalen";
  }
}
