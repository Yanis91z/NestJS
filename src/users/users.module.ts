import { Module, DynamicModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({})
export class UsersModule {
  static register(): DynamicModule {
    return {
      module: UsersModule,
      controllers: [UsersController],
      providers: [UserService],
    };
  }
}