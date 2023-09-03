import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards, Res, HttpStatus
} from '@nestjs/common';
import { Response } from "express";
import { LoginMarketDto } from "./dto/login-market.dto";
import { MarketGuard } from "src/guards/market.guard";
import { CookieGetter } from "src/decorators/cookieGetter.decorator";
import { MarketService } from './market.service';
import { CreateMarketDto } from './dto/create-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { Market } from './model/market.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddRoleMarketDto } from './dto/add-role.dto';
import { UserSelfGuard } from '../guards/user-self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Markets')
@Controller('markets')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @ApiOperation({summary:"Create market"})
  @ApiResponse({status: 200, description: 'New market', type: [Market]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  async createMarket(
    @Body() createMarketDto: CreateMarketDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const newMarketTokens = await this.marketService.createMarket(createMarketDto, res);
    return newMarketTokens;
  }

  @ApiOperation({summary:"Get all markets"})
  @ApiResponse({status: 200, description: 'List of markets', type: [Market]})
  @Get()
  async getAllMarkets():Promise<Market[]>{
    const markets = await this.marketService.getAllMarkets();
    return markets;
  }

  @ApiOperation({summary:"Get market by Id"})
  @ApiResponse({status: 200, description: 'Market by Id', type: [Market]})
  @Get(':id')
  async getMarketById(@Param('id') id: string):Promise<Market>{
    const market = await this.marketService.getMarketById(+id);
    return market;
  }

  @ApiOperation({summary:"Get market by email"})
  @ApiResponse({status: 200, description: 'Market by email', type: [Market]})
  @Post('email')
  async getMarketByEmail(@Body('email') email:string ):Promise<Market>{
    const market = await this.marketService.getMarketByEmail(email);
    return market;
  }

  @ApiOperation({summary:"Update market by Id"})
  @ApiResponse({status: 200, description: 'Updated market', type: [Market]})
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateMarketById(@Param('id') id:string, @Body() updateComanyDto: UpdateMarketDto):Promise<Market>{
    const market = await this.marketService.updateMarketById(+id, updateComanyDto);
    return market;
  }

  @ApiOperation({summary:"Delete market by Id"})
  @ApiResponse({status: 200, description: 'Deleted market', type: [Market]})
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMarketById(@Param('id') id: string) {
    const market = await this.marketService.deleteMarketById(+id);
    return market;
  }

  @ApiOperation({ summary: "Register market" })
  @ApiResponse({ status: 200, type: Market })
  @Post("signup")
  registration(
    @Body() createMarketDto: CreateMarketDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.marketService.registration(createMarketDto, res);
  }

  @ApiOperation({ summary: "Login market" })
  @ApiResponse({ status: 200, type: Market })
  // @UseGuards(MarketGuard)
  @Post("sigin")
  login(
    @Body() loginMarketDto: LoginMarketDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.marketService.login(loginMarketDto, res);
  }

  @ApiOperation({ summary: "Logout market" })
  @ApiResponse({ status: 200, type: Market })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.marketService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: "Activate market" })
  @ApiResponse({ status: 200, type: [Market] })
  // @UseGuards(MarketGuard)
  @Get('activate/:link')
  activate(@Param('link') link:string) {
    return this.marketService.activate(link);
  }

  @Post(':id/refresh')
  // @UseGuards(MarketGuard)
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.marketService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({summary:"Add role to market"})
  @ApiResponse({status: 200, description: 'Updated market', type: [Market]})
  @HttpCode(200)
  // @Roles('SUPERADMIN')
  // @UseGuards(RolesGuard)
  @Post('add_role')
  addRole(@Body() addRoleMarketDto: AddRoleMarketDto) {
    return this.marketService.addRole(addRoleMarketDto);
  }

  @ApiOperation({summary:"Remove role from market"})
  @ApiResponse({status: 200, description: 'Updated market', type: [Market]})
  @HttpCode(200)
  // @Roles('SUPERADMIN')
  // @UseGuards(RolesGuard)
  @Post('remove_role')
  removeRole(@Body() addRoleMarketDto: AddRoleMarketDto) {
    return this.marketService.removeRole(addRoleMarketDto);
  }
}
