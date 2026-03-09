import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import handlePrismaError from 'src/common/errors/prisma-error.handler';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nome, email, cpf }: CreateUserDto): Promise<void> {
    try {
      await this.prisma.user.create({
        data: { nome, email, cpf },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(where: Prisma.UserWhereInput): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({ where });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(nome: string): Promise<User> {
    try {
      return await this.prisma.user.findFirst({
        where: {
          nome: { startsWith: nome },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return this.prisma.user.update({ data: updateUserDto, where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
