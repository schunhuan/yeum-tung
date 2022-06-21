import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('transaction')
export class Transaction {
    constructor(partial?: Partial<Transaction | Transaction[]>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'string' })
    name: string;
    @Column({ type: 'string' })
    creditor: string;
    @Column({ type: 'float' })
    amount: number;
    @Column({ type: 'bool' })
    isRepay: boolean;
    @CreateDateColumn()
    create_at?: Date
    @UpdateDateColumn()
    update_at?: Date

}

