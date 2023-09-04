import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './model/brand.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Brands')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @ApiOperation({summary:"Create brand"})
  @ApiResponse({status: 200, description: 'New brand', type: [Brand]})
  // @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  // @UseGuards(RolesGuard)
  @Post()
  async createBrand(@Body() createBrandDto: CreateBrandDto):Promise<Brand>{
    const brand = await this.brandService.createBrand(createBrandDto);
    return brand;
  }

  @ApiOperation({summary:"Get all brands"})
  @ApiResponse({status: 200, description: 'List of brands', type: [Brand]})
  @Get()
  async getAllBrands():Promise<Brand[]>{
    const brands = await this.brandService.getAllBrands();
    return brands;
  }

  @ApiOperation({summary:"Get brand by Id"})
  @ApiResponse({status: 200, description: 'Brand by Id', type: [Brand]})
  @Get(':id')
  async getBrandById(@Param('id') id: string):Promise<Brand>{
    const brand = await this.brandService.getBrandById(+id);
    return brand;
  }

  @ApiOperation({summary:"Update brand by Id"})
  @ApiResponse({status: 200, description: 'Updated brand', type: [Brand]})
  // @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  // @UseGuards(RolesGuard)
  @Put(':id')
  async updateBrandById(@Param('id') id:string, @Body() updateComanyDto: UpdateBrandDto):Promise<Brand>{
    const brand = await this.brandService.updateBrandById(+id, updateComanyDto);
    return brand;
  }

  @ApiOperation({summary:"Delete brand by Id"})
  @ApiResponse({status: 200, description: 'Deleted brand', type: [Brand]})
  // @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  // @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const brand = await this.brandService.deleteBrandById(+id);
    return brand;
  }
}
