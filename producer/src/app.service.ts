import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { HealthResponse } from './models/health-response.class';

@Injectable()
export class AppService {
  constructor(@Inject('CONSUMER_SERVICE') private client: ClientProxy) {}

  healthCheck(): HealthResponse {
    return new HealthResponse('OK', new Date());
  }

  async echoWithConsumer(payload: string): Promise<string> {
    return await firstValueFrom(
      this.client.send<string>({ cmd: 'echo' }, payload),
    );
  }
}
