import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LocaisModule } from './locais/locais.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule, LocaisModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
