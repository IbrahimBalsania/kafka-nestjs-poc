import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ConsumerService } from './consumer.service';
import { CreateOrderRequest } from './create-order-request.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_QUEUE') private readonly producerClient: ClientKafka,
    private readonly _consumer: ConsumerService,
  ) {
    this.producerClient.subscribeToResponseOf('sample-topic');
  }

  @Get()
  getHello(): any {
    console.log('Hello #################################');
    // this.appService.createOrder({ userId: '123', price: 10000 });
    return this.appService.getHello();
  }

  @Post()
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    console.log(
      'REQUEST SENT TO KAFKA #############################',
      createOrderRequest,
    );
    this.appService.createOrder(createOrderRequest);
  }

  @MessagePattern('sample-topic')
  getUserReply(data: any) {
    console.log('getUserReply ########################', data);
    return true;
  }
}
