import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards, Res, HttpStatus
} from '@nestjs/common';
import { Response } from "express";
import { LoginClientDto } from "./dto/login-client.dto";
import { ClientGuard } from "src/guards/client.guard";
import { CookieGetter } from "src/decorators/cookieGetter.decorator";
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './model/client.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddRoleClientDto } from './dto/add-role.dto';
import { UserSelfGuard } from '../guards/user-self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({summary:"Create client"})
  @ApiResponse({status: 200, description: 'New client', type: [Client]})
  // @Roles('SUPERADMIN', 'ADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  async createClient(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const newClientTokens = await this.clientService.createClient(createClientDto, res);
    return newClientTokens;
  }

  @ApiOperation({summary:"Get all clients"})
  @ApiResponse({status: 200, description: 'List of clients', type: [Client]})
  @Get()
  async getAllClients():Promise<Client[]>{
    const clients = await this.clientService.getAllClients();
    return clients;
  }

  @ApiOperation({summary:"Get client by Id"})
  @ApiResponse({status: 200, description: 'Client by Id', type: [Client]})
  @Get(':id')
  async getClientById(@Param('id') id: string):Promise<Client>{
    const client = await this.clientService.getClientById(+id);
    return client;
  }

  @ApiOperation({summary:"Get client by email"})
  @ApiResponse({status: 200, description: 'Client by email', type: [Client]})
  @Post('email')
  async getClientByEmail(@Body('email') email:string ):Promise<Client>{
    const client = await this.clientService.getClientByEmail(email);
    return client;
  }

  @ApiOperation({summary:"Update client by Id"})
  @ApiResponse({status: 200, description: 'Updated client', type: [Client]})
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateClientById(@Param('id') id:string, @Body() updateComanyDto: UpdateClientDto):Promise<Client>{
    const client = await this.clientService.updateClientById(+id, updateComanyDto);
    return client;
  }

  @ApiOperation({summary:"Delete client by Id"})
  @ApiResponse({status: 200, description: 'Deleted client', type: [Client]})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteClientById(@Param('id') id: string) {
    const client = await this.clientService.deleteClientById(+id);
    return client;
  }

  @ApiOperation({ summary: "Register client" })
  @ApiResponse({ status: 200, type: Client })
  @Post("signup")
  registration(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.registration(createClientDto, res);
  }

  @ApiOperation({ summary: "Login client" })
  @ApiResponse({ status: 200, type: Client })
  @Post("signin")
  login(
    @Body() loginClientDto: LoginClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.login(loginClientDto, res);
  }

  @ApiOperation({ summary: "Logout client" })
  @ApiResponse({ status: 200, type: Client })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: "Activate client" })
  @ApiResponse({ status: 200, type: [Client] })
  // @UseGuards(ClientGuard)
  @Get('activate/:link')
  activate(@Param('link') link:string) {
    return this.clientService.activate(link);
  }

  // @UseGuards(ClientGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({summary:"Add role to client"})
  @ApiResponse({status: 200, description: 'Updated client', type: [Client]})
  @HttpCode(200)
  @Roles('SUPERADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  addRole(@Body() addRoleClientDto: AddRoleClientDto) {
    return this.clientService.addRole(addRoleClientDto);
  }

  @ApiOperation({summary:"Remove role from client"})
  @ApiResponse({status: 200, description: 'Updated client', type: [Client]})
  @HttpCode(200)
  // @Roles('SUPERADMIN')
  // @UseGuards(RolesGuard)
  @Post('remove_role')
  removeRole(@Body() addRoleClientDto: AddRoleClientDto) {
    return this.clientService.removeRole(addRoleClientDto);
  }
}
