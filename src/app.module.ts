import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportModule } from './report/report.module';
import ormConfig from './config/orm.config';
import { LogRequestMiddleware } from './request-log/log-request.middleware';
import { LogRequest } from './request-log/entities/request-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    TypeOrmModule.forFeature([LogRequest]),
    TransactionModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogRequestMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
