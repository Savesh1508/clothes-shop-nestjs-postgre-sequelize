import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { Clothes } from './model/clothes.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Clothess')
@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}
  @ApiOperation({summary:"Create clothes"})
  @ApiResponse({status: 200, description: 'New clothes', type: [Clothes]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Post()
  async createClothes(@Body() createClothesDto: CreateClothesDto):Promise<Clothes>{
    const clothes = await this.clothesService.createClothes(createClothesDto);
    return clothes;
  }

  @ApiOperation({summary:"Get all clothess"})
  @ApiResponse({status: 200, description: 'List of clothess', type: [Clothes]})
  @Get()
  async getAllClothess():Promise<Clothes[]>{
    const clothess = await this.clothesService.getAllClothes();
    return clothess;
  }

  @ApiOperation({summary:"Get clothes by Id"})
  @ApiResponse({status: 200, description: 'Clothes by Id', type: [Clothes]})
  @Get(':id')
  async getClothesById(@Param('id') id: string):Promise<Clothes>{
    const clothes = await this.clothesService.getClothesById(+id);
    return clothes;
  }

  @ApiOperation({summary:"Update clothes by Id"})
  @ApiResponse({status: 200, description: 'Updated clothes', type: [Clothes]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateClothesById(@Param('id') id:string, @Body() updateComanyDto: UpdateClothesDto):Promise<Clothes>{
    const clothes = await this.clothesService.updateClothesById(+id, updateComanyDto);
    return clothes;
  }

  @ApiOperation({summary:"Delete clothes by Id"})
  @ApiResponse({status: 200, description: 'Deleted clothes', type: [Clothes]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const clothes = await this.clothesService.deleteClothesById(+id);
    return clothes;
  }
}
