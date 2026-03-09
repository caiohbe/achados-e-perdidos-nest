import { Injectable } from '@nestjs/common';
import handlePrismaError from 'src/common/errors/prisma-error.handler';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    try {
      return await this.prisma.item.findUnique({
        where: { id },
        include: { local_encontrado: true, usuario_devolvido: true },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findAll(where: Prisma.ItemWhereInput) {
    try {
      return this.prisma.item.findMany({
        where,
        include: { local_encontrado: true, usuario_devolvido: true },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      await this.prisma.item.update({
        where: { id },
        data: { ...updateItemDto },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async create({
    item,
    descricao,
    imagem_URL,
    data_encontrado,
    local_encontrado_id,
  }: CreateItemDto) {
    try {
      await this.prisma.item.create({
        data: {
          imagem_URL,
          item,
          descricao,
          data_encontrado,
          local_encontrado_id,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
