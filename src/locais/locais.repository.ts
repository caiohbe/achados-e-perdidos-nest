import { Injectable } from '@nestjs/common';
import { CreateLocaisDto } from './dto/create-locai.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocaisSenai, Prisma } from '@prisma/client';
import handlePrismaError from 'src/common/errors/prisma-error.handler';
import { UpdateLocaisDto } from './dto/update-locai.dto';

@Injectable()
export class LocaisRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nome }: CreateLocaisDto): Promise<void> {
    try {
      await this.prisma.locaisSenai.create({
        data: { nome },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(where: Prisma.LocaisSenaiWhereInput): Promise<LocaisSenai[]> {
    try {
      return await this.prisma.locaisSenai.findMany({
        where,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOne(nome: string): Promise<LocaisSenai[]> {
    try {
      return await this.prisma.locaisSenai.findMany({
        where: {
          nome: {
            contains: nome,
          },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(
    id: number,
    updateLocaisDto: UpdateLocaisDto,
  ): Promise<LocaisSenai> {
    try {
      return await this.prisma.locaisSenai.update({
        data: updateLocaisDto,
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.locaisSenai.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
