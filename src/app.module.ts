import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewRequestsModule } from './review-requests/review-requests.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { applicationConfig } from 'config';
import { Dialect } from 'sequelize/types';
import { ReviewRequest } from './review-requests/entities/review-request.entity';
import { Store } from './store/store.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_NAME: Joi.string(),
        PORT: Joi.number().default(8080),
        ENV: Joi.string()
          .valid('development', 'base', 'beta', 'qa', 'qa2')
          .default('development'),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: applicationConfig.db.db_dialect as Dialect,
      host: applicationConfig.db.host,
      username: applicationConfig.db.user,
      password: applicationConfig.db.password,
      port: parseInt(applicationConfig.db.port, 10),
      database: applicationConfig.db.name,
      models: [
        ReviewRequest,
        Store
      ],
      logging: false,
    }),
    ReviewRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
