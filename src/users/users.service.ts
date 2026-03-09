import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<void> {
    return this.usersRepository.create(createUserDto);
  }

  findAll(params: { search?: string }): Promise<User[]> {
    const where: Prisma.UserWhereInput = {};

    if (params.search) {
      where.nome = { startsWith: params.search };
    }

    return this.usersRepository.findAll(where);
  }

  findOne(name: string): Promise<User> {
    return this.usersRepository.findOne(name);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number): Promise<void> {
    return this.usersRepository.remove(id);
  }
}
