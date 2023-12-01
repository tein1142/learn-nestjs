import { Inject, Injectable, UseGuards, forwardRef, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.username = createUserDto.username;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      order: {
        id: 'ASC'
      },
      relations: ['subjects','roles']
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['subjects'] });
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOneBy({ id });
    user.username = updateUserDto.username;
    user.firstname = updateUserDto.firstname;
    user.lastname = updateUserDto.lastname;
    return await this.userRepository.save(user);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  async addSubject(userId: number, subjectId: number) {
    try {
      const user: User = await this.userRepository.findOne({ where: { id: userId }, relations: ['subjects'] });
      const subject: Subject = await this.subjectRepository.findOneBy({ id: subjectId });

      if (!subject) {
        return "Subject does not exist.";
      }

      user.subjects.push(subject);
      return await this.userRepository.save(user);
    } catch (error) {
      return console.log(error);
    }
  }

 
}
