import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';
import { CreateOrderRequest } from './create-order-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_QUEUE') private readonly producerClient: ClientKafka,
    private readonly consumer: ConsumerService,
  ) {}
  onModuleInit() {
    this.consumer.consume(
      'kafka-group',
      { topic: 'sample-topic.reply' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log('RESULT ########################## ', {
            source: 'sample-topic.reply',
            message: message.value.toString(),
            partition: partition.toString(),
            topic: topic.toString(),
          });
        },
      },
    );
  }

  getHello(): string {
    return 'Hello World!';
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    this.producerClient.emit(
      'sample-topic',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}
