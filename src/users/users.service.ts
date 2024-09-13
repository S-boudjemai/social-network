import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.usersRepository.find();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    console.log(`Searching for user by username: ${username}`);
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }
    return user;
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findAllUsersByGroup(groupId: number): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: { group: { id: groupId } },
      relations: ['group'],
    });

    if (users.length === 0) {
      throw new NotFoundException(`No users found for group #${groupId}`);
    }
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
