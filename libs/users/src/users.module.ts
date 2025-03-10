import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [RolesModule, PermissionModule],
})
export class UsersModule {}
