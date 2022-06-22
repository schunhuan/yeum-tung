import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequest } from './entities/request-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogRequest]),
  ]
})

export class RequestLogModule { }
