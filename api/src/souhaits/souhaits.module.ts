import { Module } from '@nestjs/common';
import { SouhaitsService } from './souhaits.service';
import { SouhaitsController } from './souhaits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Souhaits, Membre } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Souhaits, Membre])
  ],
  providers: [SouhaitsService],
  controllers: [SouhaitsController]
})
export class SouhaitsModule {}
