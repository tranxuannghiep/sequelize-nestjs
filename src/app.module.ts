import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { getDatabaseConfig } from './core/database/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/books/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    BookModule,
    SequelizeModule.forRoot({
      ...getDatabaseConfig(),
      logging: null,
      autoLoadModels: true,
      sync: {
        alter: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
