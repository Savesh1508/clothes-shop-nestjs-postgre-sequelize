import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { MarketClothesService } from './market_clothes.service';
import { CreateMarketClothesDto } from './dto/create-market_clothes.dto';
import { UpdateMarketClothesDto } from './dto/update-market_clothes.dto';
import { MarketClothes } from './model/market_clothes.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('MarketClothes')
@Controller('marketClothes')
export class MarketClothesController {
  constructor(private readonly marketClothesService: MarketClothesService) {}
  @ApiOperation({summary:"Create market clothes"})
  @ApiResponse({status: 200, description: 'New market clothes', type: [MarketClothes]})
  // @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  // @UseGuards(RolesGuard)
  @Post()
  async createMarketClothes(@Body() createMarketClothesDto: CreateMarketClothesDto):Promise<MarketClothes>{
    const marketClothes = await this.marketClothesService.createMarketClothes(createMarketClothesDto);
    return marketClothes;
  }

  @ApiOperation({summary:"Get all market clothes"})
  @ApiResponse({status: 200, description: 'List of market clothes', type: [MarketClothes]})
  @Get()
  async getAllMarketClothes():Promise<MarketClothes[]>{
    const marketClothes = await this.marketClothesService.getAllMarketClothes();
    return marketClothes;
  }

  @ApiOperation({summary:"Get market clothes by Id"})
  @ApiResponse({status: 200, description: 'Market clothes by Id', type: [MarketClothes]})
  @Get(':id')
  async getMarketClothesById(@Param('id') id: string):Promise<MarketClothes>{
    const marketClothes = await this.marketClothesService.getMarketClothesById(+id);
    return marketClothes;
  }

  @ApiOperation({summary:"Update market clothes by Id"})
  @ApiResponse({status: 200, description: 'Updated market clothes', type: [MarketClothes]})
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateMarketClothesById(@Param('id') id:string, @Body() updateComanyDto: UpdateMarketClothesDto):Promise<MarketClothes>{
    const marketClothes = await this.marketClothesService.updateMarketClothesById(+id, updateComanyDto);
    return marketClothes;
  }

  @ApiOperation({summary:"Delete market clothes by Id"})
  @ApiResponse({status: 200, description: 'Deleted market clothes', type: [MarketClothes]})
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const marketClothes = await this.marketClothesService.deleteMarketClothesById(+id);
    return marketClothes;
  }
}
