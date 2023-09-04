import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './model/brand.model';
import { SharedModule } from '../shared/shared.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Brand]),
  ],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
