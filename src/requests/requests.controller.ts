import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('requests')
@UseGuards(JwtAuthGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto, @Request() req) {
    console.log('Request User:', req.user); // Ajoutez ce log pour déboguer
    const userId = req.user.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.requestsService.create(createRequestDto, userId);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  @Get('group/:groupId')
  findAllRequestsByGroup(@Param('groupId') groupId: string, @Request() req) {
    const user = req.user;
    if (!user || user.role !== 'franchisor') {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.requestsService.findAllRequestsByGroup(+groupId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
