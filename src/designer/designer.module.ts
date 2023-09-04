import { Module } from '@nestjs/common';
import { DesignerService } from './designer.service';
import { DesignerController } from './designer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Designer } from './model/designer.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Designer]),
  ],
  controllers: [DesignerController],
  providers: [DesignerService]
})
export class DesignerModule {}
