import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@app/users';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'arun',
      password: 'Arun@123',
      database: 'lib-task',
      autoLoadEntities: true,
      synchronize: true,
    })
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
