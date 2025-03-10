import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ConflictException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.rolesService.create(createRoleDto);

    if (!role.isNew) {
      throw new ConflictException('Role already exists');
    }

    return {
      message: 'Role created successfully',
      data: role.data
    };
  }

  @Get()
  async findAll() {
    const allRoles = await this.rolesService.findAll();
    if (allRoles.length === 0) {
      throw new ConflictException('No roles found');
    }
    return {
      message: 'Roles found',
      data: allRoles
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new ConflictException('Role not found');
    }
    return {
      message: 'Role found',
      data: role
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const roleupdate = await this.rolesService.update(id, updateRoleDto);
    if (!roleupdate.isContains) {
      throw new ConflictException('Role not found');
    }
    return {
      message: 'Role updated successfully',
      data: roleupdate.data
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const roleDelete = await this.rolesService.remove(id);
    if (!roleDelete.isContains) {
      throw new ConflictException('Role not found');
    }
    return {
      message: 'Role deleted successfully',
      data: roleDelete.data
    }
  }
}
