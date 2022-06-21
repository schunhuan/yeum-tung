import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import * as dayjs from 'dayjs';
import { BaseResponse } from 'src/response/response';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const createResult = await this.transactionRepository.save(
      new Transaction({ ...createTransactionDto, isRepay: false }),
    );
    return plainToClass(Transaction, createResult);
  }

  async repay(id: string): Promise<BaseResponse> {
    let transaction = await this.transactionRepository.findOneBy({ id: id })
    if (!transaction) return plainToClass(BaseResponse, { message: "Transaction not found", Status: 1 });
    transaction.isRepay = true
    await this.transactionRepository.save(transaction)
    return plainToClass(BaseResponse, { message: "success", Status: 0 })

  }

}
