import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('log_request')
export class LogRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column()
    path: string;

    @CreateDateColumn()
    created_at;
}