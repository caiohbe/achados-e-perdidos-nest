import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsRepository } from './items.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  create(createItemDto: CreateItemDto) {
    return this.itemsRepository.create(createItemDto);
  }

  findAll(params: {
    search?: string;
    userId?: string;
    localId?: string;
    date?: string;
  }) {
    const where: Prisma.ItemWhereInput = {};

    if (params.search) {
      where.item = { startsWith: params.search };
    }

    if (params.userId === 'none') {
      where.usuario_devolvido_id = null;
    } else if (params.userId) {
      where.usuario_devolvido_id = +params.userId;
    }

    if (params.localId) {
      where.local_encontrado_id = +params.localId;
    }

    if (params.date) {
      const date = new Date(params.date);
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      where.data_encontrado = {
        gte: date,
        lt: nextDate,
      };
    }

    return this.itemsRepository.findAll(where);
  }

  findOne(id: number) {
    return this.itemsRepository.findOne(id);
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemsRepository.update(id, updateItemDto);
  }

  remove(id: number) {
    return this.itemsRepository.remove(id);
  }
}
