import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { Commentary } from './model/commentary.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Commentarys')
@Controller('commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}
  @ApiOperation({summary:"Create commentary"})
  @ApiResponse({status: 200, description: 'New commentary', type: [Commentary]})
  // @Roles('SUPERADMIN', 'ADMIN', 'USER')
  // @UseGuards(RolesGuard)
  @Post()
  async createCommentary(@Body() createCommentaryDto: CreateCommentaryDto):Promise<Commentary>{
    const commentary = await this.commentaryService.createCommentary(createCommentaryDto);
    return commentary;
  }

  @ApiOperation({summary:"Get all commentarys"})
  @ApiResponse({status: 200, description: 'List of commentarys', type: [Commentary]})
  @Get()
  async getAllCommentarys():Promise<Commentary[]>{
    const commentarys = await this.commentaryService.getAllCommentarys();
    return commentarys;
  }

  @ApiOperation({summary:"Get commentary by Id"})
  @ApiResponse({status: 200, description: 'Commentary by Id', type: [Commentary]})
  @Get(':id')
  async getCommentaryById(@Param('id') id: string):Promise<Commentary>{
    const commentary = await this.commentaryService.getCommentaryById(+id);
    return commentary;
  }

  @ApiOperation({summary:"Update commentary by Id"})
  @ApiResponse({status: 200, description: 'Updated commentary', type: [Commentary]})
  // @Roles('SUPERADMIN', 'ADMIN', 'USER')
  // @UseGuards(RolesGuard)
  @Put(':id')
  async updateCommentaryById(@Param('id') id:string, @Body() updateComanyDto: UpdateCommentaryDto):Promise<Commentary>{
    const commentary = await this.commentaryService.updateCommentaryById(+id, updateComanyDto);
    return commentary;
  }

  @ApiOperation({summary:"Delete commentary by Id"})
  @ApiResponse({status: 200, description: 'Deleted commentary', type: [Commentary]})
  // @Roles('SUPERADMIN', 'ADMIN', 'USER')
  // @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const commentary = await this.commentaryService.deleteCommentaryById(+id);
    return commentary;
  }
}
