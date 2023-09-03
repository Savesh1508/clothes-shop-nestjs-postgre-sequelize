import { Module } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CommentaryController } from './commentary.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Commentary } from './model/commentary.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Commentary]),
  ],
  controllers: [CommentaryController],
  providers: [CommentaryService, JwtService]
})
export class CommentaryModule {}
