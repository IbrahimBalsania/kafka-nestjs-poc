import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_QUEUE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-group-client-id',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-group',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConsumerService, ProducerService],
})
export class AppModule {}
