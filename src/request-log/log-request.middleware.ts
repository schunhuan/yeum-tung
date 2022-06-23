
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { LogRequest } from './entities/request-log.entity';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(LogRequest)
        private readonly logRequestRepository: Repository<LogRequest>,
    ) { }
    use(req: Request, res: Response, next: NextFunction) {
        this.logRequestRepository.save({ body: req.body, path: req.originalUrl })
        next();
    }
}