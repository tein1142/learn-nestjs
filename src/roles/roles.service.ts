import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  create(createRoleDto: CreateRoleDto) {
    const role = new Role;
    role.roleName = createRoleDto.roleName
    role.description = createRoleDto.description
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const oldRole = await this.roleRepository.findOneBy({ id })
    oldRole.roleName = updateRoleDto.roleName;
    oldRole.description = updateRoleDto.description
    return this.roleRepository.save(oldRole);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }

  async addRole(userId: number, roleId: number) {
    try {
      const user: User = await this.userRepository.findOne({ where: { id: userId }, relations: ["roles"] })
      const role: Role = await this.roleRepository.findOneBy({ id: roleId })
      console.log(user);
      console.log(role);
      
      if(!user){
        return "User does not exist.";
      }
      if (!role) {
        return "Role does not exist.";
      }
      user.roles.push(role)
      return await this.userRepository.save(user);
    } catch (error) {
      return console.log(error);

    }
  }
}
