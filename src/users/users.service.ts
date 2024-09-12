import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/groups.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, role, groupName } = createUserDto;

    let group: Group | null = null;

    if (role === 'franchisor' && groupName) {
      group = this.groupRepository.create({ name: groupName });
      await this.groupRepository.save(group);
    }

    if (role === 'franchisee' && groupName) {
      group = await this.groupRepository.findOne({
        where: { name: groupName },
      });

      if (!group) {
        throw new Error(`Group ${groupName} not found`);
      }
    }
    const newUser = this.usersRepository.create({
      username,
      password,
      email,
      role,
      group,
    });

    return await this.usersRepository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
