import { Module } from '@nestjs/common';
import { LocaisService } from './locais.service';
import { LocaisController } from './locais.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocaisRepository } from './locais.repository';

@Module({
  controllers: [LocaisController],
  providers: [LocaisService, LocaisRepository],
  imports: [PrismaModule],
})
export class LocaisModule {}
