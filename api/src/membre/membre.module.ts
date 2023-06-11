import { Module } from '@nestjs/common';
import { MembreController } from './membre.controller';
import { MembreService } from './membre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membre } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Membre])
  ],
  controllers: [MembreController],
  providers: [MembreService]
})
export class MembreModule {}
