import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemsRepository } from './items.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  imports: [PrismaModule],
})
export class ItemsModule {}
