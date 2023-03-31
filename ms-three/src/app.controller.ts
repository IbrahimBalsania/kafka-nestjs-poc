import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('sample-topic')
  getUser(data: any) {
    console.log(
      '🚀 ~ file: app.controller.ts:16 ~ AppController ~ getUser ~ data',
      data.value,
    );

    return this.appService.getUser(data.value);
  }
}
