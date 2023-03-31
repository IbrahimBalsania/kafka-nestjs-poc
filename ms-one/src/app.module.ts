import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
            retry: {
              initialRetryTime: 100,
              retries: 8,
            },
          },
          consumer: {
            groupId: 'kafka-group',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
