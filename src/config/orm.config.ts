import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Transaction } from "src/transaction/entities/transaction.entity";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'cockroachdb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Transaction],
    synchronize: (process.env.ORM_IS_SYNC === 'true'),
    ssl: (process.env.DB_SSL == "true" ? ({ rejectUnauthorized: false }) : false)
}
));