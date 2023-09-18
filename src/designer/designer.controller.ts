import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { DesignerService } from './designer.service';
import { CreateDesignerDto } from './dto/create-designer.dto';
import { UpdateDesignerDto } from './dto/update-designer.dto';
import { Designer } from './model/designer.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Designers')
@Controller('designer')
export class DesignerController {
  constructor(private readonly designerService: DesignerService) {}
  @ApiOperation({summary:"Create designer"})
  @ApiResponse({status: 200, description: 'New designer', type: [Designer]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Post()
  async createDesigner(@Body() createDesignerDto: CreateDesignerDto):Promise<Designer>{
    const designer = await this.designerService.createDesigner(createDesignerDto);
    return designer;
  }

  @ApiOperation({summary:"Get all designers"})
  @ApiResponse({status: 200, description: 'List of designers', type: [Designer]})
  @Get()
  async getAllDesigners():Promise<Designer[]>{
    const designers = await this.designerService.getAllDesigners();
    return designers;
  }

  @ApiOperation({summary:"Get designer by Id"})
  @ApiResponse({status: 200, description: 'Designer by Id', type: [Designer]})
  @Get(':id')
  async getDesignerById(@Param('id') id: string):Promise<Designer>{
    const designer = await this.designerService.getDesignerById(+id);
    return designer;
  }

  @ApiOperation({summary:"Update designer by Id"})
  @ApiResponse({status: 200, description: 'Updated designer', type: [Designer]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateDesignerById(@Param('id') id:string, @Body() updateComanyDto: UpdateDesignerDto):Promise<Designer>{
    const designer = await this.designerService.updateDesignerById(+id, updateComanyDto);
    return designer;
  }

  @ApiOperation({summary:"Delete designer by Id"})
  @ApiResponse({status: 200, description: 'Deleted designer', type: [Designer]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const designer = await this.designerService.deleteDesignerById(+id);
    return designer;
  }
}
