import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  private readonly producer: Producer = this.kafka.producer();
  private readonly admin = this.kafka.admin();

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
  async onModuleInit() {
    await this.producer.connect();
    const topic = 'sample-topic';
    const numPartitions = 5;
    // Create the topic if it does not exist
    await this.admin.createTopics({
      topics: [{ topic, numPartitions }],
    });
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }
}
