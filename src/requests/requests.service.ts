import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private requestsRepository: Repository<Request>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createRequestDto: CreateRequestDto, requesterId: number) {
    const request = this.requestsRepository.create({
      ...createRequestDto,
      requester_id: requesterId,
    });
    return await this.requestsRepository.save(request);
  }

  findAll() {
    return this.requestsRepository.find();
  }

  async findOne(id: number) {
    const request = await this.requestsRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request ${id} not found`);
    }
    return request;
  }

  async findAllRequestsByGroup(groupId: number) {
    // Trouver tous les utilisateurs dans le groupe
    const usersInGroup = await this.usersRepository.find({
      where: { group: { id: groupId } },
    });
    // Map les ids des utilisateurs dans un tableau
    const requesterIds = usersInGroup.map((user) => user.id);

    // Trouver les rerquester id des utilisateurs dans le groupe
    const requests = await this.requestsRepository.find({
      where: {
        requester_id: In(requesterIds),
      },
    });
    return requests;
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const request = await this.requestsRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request #${id} not found`);
    }
    Object.assign(request, updateRequestDto);
    return this.requestsRepository.save(request);
  }

  remove(id: number) {
    return this.requestsRepository.delete(id);
  }
}
