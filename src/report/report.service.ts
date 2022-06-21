import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import { ReportUnpaidResponse, Unpaid, UnpaidResponse } from './dto/reportUnpaidResponse';


@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) { }

  async unPaid(name: string): Promise<ReportUnpaidResponse> {
    let result = new ReportUnpaidResponse()
    let unpaidlist: Unpaid[] = await this.transactionRepository.createQueryBuilder().select(`
    creditor,
    sum(amount) as amount`)
      .where(`name = '${name}'`)
      .andWhere(`"isRepay" = false`)
      .addGroupBy(`"creditor"`)
      .getRawMany()
    if (!unpaidlist || unpaidlist.length === 0) throw new NotFoundException()
    result.result = {
      name: name,
      unpaidlist: unpaidlist
    }
    result.message = `Success`
    result.status = 0
    return plainToClass(ReportUnpaidResponse, result)
  }

  async transaction(name?: string) {
    let qbTransaction = await this.transactionRepository.createQueryBuilder()
      .select(`*`)
    if (name) qbTransaction = qbTransaction.where(`name = '${name}'`)
    return qbTransaction.getRawMany()
  }
}
