import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './model/region.model';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    SequelizeModule.forFeature([Region]),
  ],
  controllers: [RegionController],
  providers: [RegionService, JwtService]
})
export class RegionModule {}