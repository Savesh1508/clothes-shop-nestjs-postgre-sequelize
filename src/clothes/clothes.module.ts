import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Clothes } from './model/clothes.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Clothes]),
  ],
  controllers: [ClothesController],
  providers: [ClothesService]
})
export class ClothesModule {}
