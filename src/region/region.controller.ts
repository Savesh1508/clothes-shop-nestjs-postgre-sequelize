import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './model/region.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Regions')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
  @ApiOperation({summary:"Create region"})
  @ApiResponse({status: 200, description: 'New region', type: [Region]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  async createRegion(@Body() createRegionDto: CreateRegionDto):Promise<Region>{
    const region = await this.regionService.createRegion(createRegionDto);
    return region;
  }

  @ApiOperation({summary:"Get all regions"})
  @ApiResponse({status: 200, description: 'List of regions', type: [Region]})
  @Get()
  async getAllRegions():Promise<Region[]>{
    const regions = await this.regionService.getAllRegions();
    return regions;
  }

  @ApiOperation({summary:"Get region by Id"})
  @ApiResponse({status: 200, description: 'Region by Id', type: [Region]})
  @Get(':id')
  async getRegionById(@Param('id') id: string):Promise<Region>{
    const region = await this.regionService.getRegionById(+id);
    return region;
  }

  @ApiOperation({summary:"Update region by Id"})
  @ApiResponse({status: 200, description: 'Updated region', type: [Region]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Put(':id')
  async updateRegionById(@Param('id') id:string, @Body() updateComanyDto: UpdateRegionDto):Promise<Region>{
    const region = await this.regionService.updateRegionById(+id, updateComanyDto);
    return region;
  }

  @ApiOperation({summary:"Delete region by Id"})
  @ApiResponse({status: 200, description: 'Deleted region', type: [Region]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const region = await this.regionService.deleteRegionById(+id);
    return region;
  }
}
