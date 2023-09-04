import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './model/company.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Company]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
