import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }

  public async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const roleName = name.trim().toLowerCase();

    const existingRole = await this.roleRepository.findOne({ where: { name: roleName } });
    if (existingRole) {
      return {
        isNew: false,
        data: existingRole
      };
    }

    const newRole = this.roleRepository.create({ name: roleName });
    await this.roleRepository.save(newRole);
    return {
      isNew: true,
      data: newRole
    };
  }

  public async findAll() {
    return await this.roleRepository.find();
  }

  public async findOne(id: string) {
    return await this.roleRepository.findOne({ where: { id } });

  }

  public async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      return {
        isContains: false,
      }
    }
    await this.roleRepository.update(id, updateRoleDto);
    return {
      isContains: true,
      data: await this.roleRepository.findOne({ where: { id } })
    }
  }

  public async remove(id: string) {
    const role = await this.findOne(id);
    if (!role) {
      return {
        isContains: false,
      }
    }
    const delRole = await this.roleRepository.delete(id);
    return {
      isContains: true,
      data: delRole
    }
  }
}
