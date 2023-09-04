// import {
//   Controller, Body, Param,
//   Get, Post, Put, Delete, Res,
//   HttpCode
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
// import { CreateClientDto } from '../client/dto/create-client.dto';
// import { Response } from "express";
// import { CreateAdminDto } from '../admin/dto/create-admin.dto';
// import { CreateMarketDto } from '../market/dto/create-market.dto';
// import { LoginClientDto } from '../client/dto/login-client.dto';
// import { LoginMarketDto } from '../market/dto/login-market.dto';
// import { LoginAdminDto } from '../admin/dto/login-admin.dto';


// @ApiTags('Authorization')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService){}

//   @HttpCode(200)
//   @ApiOperation({summary:"Register client"})
//   @ApiResponse({status: 200, description: 'Token'})
//   @Post('signup/client')
//   registrationClient(
//     @Body() createClientDto: CreateClientDto,
//     @Res({ passthrough: true }) res: Response
//   ){
//     return this.authService.registration(createClientDto, res);
//   }

//   @HttpCode(200)
//   @ApiOperation({summary:"Register admin"})
//   @ApiResponse({status: 200, description: 'Token'})
//   @Post('signup/admin')
//   registrationAdmin(
//     @Body() createAdminDto: CreateAdminDto,
//     @Res({ passthrough: true }) res: Response
//   ){
//     return this.authService.registration(createAdminDto, res);
//   }

//   @HttpCode(200)
//   @ApiOperation({summary:"Register market"})
//   @ApiResponse({status: 200, description: 'Token'})
//   @Post('signup/market')
//   registrationMarket(
//     @Body() createMarketDto: CreateMarketDto,
//     @Res({ passthrough: true }) res: Response
//   ){
//     return this.authService.registration(createMarketDto, res);
//   }

//   @HttpCode(200)
//   @ApiOperation({summary:"Login client"})
//   @ApiResponse({status: 200, description: 'Token'})
//   @Post('login/client')
//   loginClient(
//     @Body() loginClientDto:LoginClientDto,
//     @Res({ passthrough: true }) res: Response
//   ){
//     return this.authService.login(loginClientDto, res);
//   }

//   @HttpCode(200)
//   @ApiOperation({summary:"Login admin"})
//   @ApiResponse({status: 200, description: 'Token'})
//   @Post('login/admin')
//   loginAdmin(
//     @Body() loginAdminDto:LoginAdminDto,
//     @Res({ passthrough: true }) res: Response
//   ){
//     return this.authService.login(loginAdminDto, res);
//   }

//   @HttpCode(200)
//   @ApiOperation({summary:"Login market"})
//   @ApiResponse({status: 200, description: 'Token'})
//   @Post('login/market')
//   loginMarket(
//     @Body() loginMarketDto:LoginMarketDto,
//     @Res({ passthrough: true }) res: Response
//   ){
//     return this.authService.login(loginMarketDto, res);
//   }
// }
