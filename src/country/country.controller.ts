import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './model/country.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Countries')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  @ApiOperation({summary:"Create country"})
  @ApiResponse({status: 200, description: 'New country', type: [Country]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  async createCountry(@Body() createCountryDto: CreateCountryDto):Promise<Country>{
    const country = await this.countryService.createCountry(createCountryDto);
    return country;
  }

  @ApiOperation({summary:"Get all countrys"})
  @ApiResponse({status: 200, description: 'List of countrys', type: [Country]})
  @Get()
  async getAllCountrys():Promise<Country[]>{
    const countrys = await this.countryService.getAllCountrys();
    return countrys;
  }

  @ApiOperation({summary:"Get country by Id"})
  @ApiResponse({status: 200, description: 'Country by Id', type: [Country]})
  @Get(':id')
  async getCountryById(@Param('id') id: string):Promise<Country>{
    const country = await this.countryService.getCountryById(+id);
    return country;
  }

  @ApiOperation({summary:"Update country by Id"})
  @ApiResponse({status: 200, description: 'Updated country', type: [Country]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Put(':id')
  async updateCountryById(@Param('id') id:string, @Body() updateComanyDto: UpdateCountryDto):Promise<Country>{
    const country = await this.countryService.updateCountryById(+id, updateComanyDto);
    return country;
  }

  @ApiOperation({summary:"Delete country by Id"})
  @ApiResponse({status: 200, description: 'Deleted country', type: [Country]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const country = await this.countryService.deleteCountryById(+id);
    return country;
  }
}
