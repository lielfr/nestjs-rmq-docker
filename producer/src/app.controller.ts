import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HealthResponse } from './models/health-response.class';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('health')
  healthCheck(): HealthResponse {
    return this.appService.healthCheck();
  }

  @Get('echo')
  async echoWithConsumer(@Query('s') payload: string): Promise<string> {
    const result = await this.appService.echoWithConsumer(payload);
    return result;
  }
}
