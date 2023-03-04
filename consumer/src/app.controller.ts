import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'echo' })
  echo(data: string): string {
    this.logger.debug(`Got cmd echo from producer with data: ${data}`);
    return `Echo from consumer: ${data}`;
  }
}
