import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesModule } from './roles/roles.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [RolesModule],
})
export class UsersModule {}
