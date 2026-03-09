import { Injectable } from '@nestjs/common';
import { CreateLocaisDto } from './dto/create-locai.dto';
import { UpdateLocaisDto } from './dto/update-locai.dto';
import { LocaisRepository } from './locais.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class LocaisService {
  constructor(private readonly locaisRepository: LocaisRepository) {}

  create(createLocaisDto: CreateLocaisDto) {
    return this.locaisRepository.create(createLocaisDto);
  }

  findAll(params: { search?: string }) {
    const where: Prisma.LocaisSenaiWhereInput = {};

    if (params.search) {
      where.nome = { startsWith: params.search };
    }
    return this.locaisRepository.findAll(where);
  }

  findOne(nome: string) {
    return this.locaisRepository.findOne(nome);
  }

  update(id: number, updateLocaiDto: UpdateLocaisDto) {
    return this.locaisRepository.update(id, updateLocaiDto);
  }

  remove(id: number) {
    return this.locaisRepository.remove(id);
  }
}
