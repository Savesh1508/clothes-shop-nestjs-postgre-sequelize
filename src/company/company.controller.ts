import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './model/company.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Companies')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @ApiOperation({summary:"Create company"})
  @ApiResponse({status: 200, description: 'New company', type: [Company]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto):Promise<Company>{
    const company = await this.companyService.createCompany(createCompanyDto);
    return company;
  }

  @ApiOperation({summary:"Get all companies"})
  @ApiResponse({status: 200, description: 'List of companies', type: [Company]})
  @Get()
  async getAllCompanys():Promise<Company[]>{
    const companys = await this.companyService.getAllCompanys();
    return companys;
  }

  @ApiOperation({summary:"Get company by Id"})
  @ApiResponse({status: 200, description: 'Company by Id', type: [Company]})
  @Get(':id')
  async getCompanyById(@Param('id') id: string):Promise<Company>{
    const company = await this.companyService.getCompanyById(+id);
    return company;
  }

  @ApiOperation({summary:"Update company by Id"})
  @ApiResponse({status: 200, description: 'Updated company', type: [Company]})
    @Roles('SUPERADMIN', 'ADMIN', 'MARKET')

  @UseGuards(RolesGuard)
  @Put(':id')
  async updateCompanyById(@Param('id') id:string, @Body() updateComanyDto: UpdateCompanyDto):Promise<Company>{
    const company = await this.companyService.updateCompanyById(+id, updateComanyDto);
    return company;
  }

  @ApiOperation({summary:"Delete company by Id"})
  @ApiResponse({status: 200, description: 'Deleted company', type: [Company]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const company = await this.companyService.deleteCompanyById(+id);
    return company;
  }
}
