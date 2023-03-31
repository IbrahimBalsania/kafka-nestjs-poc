import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA_QUEUE') private readonly consumerClient: ClientKafka,
  ) {}

  private readonly users: any[] = [
    {
      userId: '123',
      stripeUserId: '43234',
    },
    {
      userId: '345',
      stripeUserId: '27279',
    },
    {
      userId: 'IB',
      stripeUserId: 'IB-2135464',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async getUser(getUserRequest: GetUserRequest) {
    // await new Promise((r) => setTimeout(r, 10000));
    console.log('SENDING RESPONSE #########################');
    this.consumerClient.emit(
      'sample-topic.reply',
      JSON.stringify({ msg: 'from MS-TWO' }),
    );
    return this.users.find((user) => user.userId === getUserRequest.userId);
  }
}
