import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/groups.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupsRepository.create(createGroupDto);
    return await this.groupsRepository.save(group);
  }

  findAll() {
    return this.groupsRepository.find();
  }

  async findOne(id: number) {
    const group = await this.groupsRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`Group #${id} not found`);
    }
    return group;
  }

  async findOneByName(name: string) {
    const group = await this.groupsRepository.findOne({ where: { name } });
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsRepository.findOne({ where: { id } });

    if (!group) {
      throw new NotFoundException(`Group #${id} not found`);
    }

    Object.assign(group, updateGroupDto);

    return this.groupsRepository.save(group);
  }

  remove(id: number) {
    this.groupsRepository.delete(id);
  }
}
