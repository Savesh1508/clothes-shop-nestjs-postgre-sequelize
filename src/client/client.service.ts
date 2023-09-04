import { HttpException, HttpStatus, BadRequestException, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { RoleService } from "src/roles/roles.service";
import { AddRoleClientDto } from "./dto/add-role.dto";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Client } from "./model/client.model";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "src/mail/mail.service";
import { LoginClientDto } from "./dto/login-client.dto";

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private clientRepo: typeof Client,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
  ){}

  async createClient(createClientDto:CreateClientDto, res: Response) {
    const client = await this.clientRepo.findOne({
      where: { email: createClientDto.email },
    });
    if (client) {
      throw new BadRequestException("Email already exists");
    }
    if (createClientDto.password !== createClientDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createClientDto.password, 7);
    const newClient = await this.clientRepo.create({
      ...createClientDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('MARKET');
    // const role = await this.roleService.getRoleByValue('ADMIN');
    // const role = await this.roleService.getRoleByValue('SUPERADMIN');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await client.$set('roles', [role.id]);
    await client.save();
    client.roles = [role];

    const tokens = await this.getTokens(newClient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();
    const updateClient = await this.clientRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newClient.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendClientConfirmation(updateClient[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    return newClient;
  }

  async getAllClients():Promise<Client[]> {
    const clients = await this.clientRepo.findAll({include: {all: true}});
    return clients;
  }

  async getClientById(id:number) {
    const client = await this.clientRepo.findOne({where: {id}, include: {all: true}});
    return client;
  }

  async getClientByEmail(email:string) {
    const client = await this.clientRepo.findOne({where: {email}, include: {all: true}});
    return client;
  }

  async updateClientById(id:number, updateClientDto:UpdateClientDto):Promise<Client> {
    const client = await this.clientRepo.update(updateClientDto, {where: {id}, returning: true});
    return client[1][0].dataValues;
  }

  async deleteClientById(id:number) {
    const client = await this.clientRepo.destroy({where: {id}})
    if (!client) {
      throw new HttpException('Client not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Client has deleted!"};
  }

  async registration(createClientDto: CreateClientDto, res: Response) {
    const client = await this.clientRepo.findOne({
      where: { email: createClientDto.email },
    });
    if (client) {
      throw new BadRequestException("Email already exists");
    }
    if (createClientDto.password !== createClientDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createClientDto.password, 7);
    const newClient = await this.clientRepo.create({
      ...createClientDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('MARKET');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await newClient.$set('roles', [role.id]);
    await newClient.save();
    newClient.roles = [role];

    const tokens = await this.getTokens(newClient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();

    const updateClient = await this.clientRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newClient.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendClientConfirmation(updateClient[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: "Client registred",
      client: updateClient[1][0],
      tokens,
    };
    return response;
  }

  async login(loginClientDto: LoginClientDto, res: Response) {
    const { email, password } = loginClientDto
    const client = await this.clientRepo.findOne({
      where: { email },
    });

    if (!client) {
      throw new UnauthorizedException("Client is not registered");
    }
    if (!client.is_active) {
      throw new UnauthorizedException("Client is not active");
    }
    const isMatchPass = await bcrypt.compare(password, client.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Client is not registered(pss)')
    }

    const tokens = await this.getTokens(client);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateClient = await this.clientRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: client.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Client logged in",
      client: updateClient[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const clientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if (!clientData) {
      throw new ForbiddenException('Client not found');
    }
    const updatedClient = await this.clientRepo.update(
      {hashed_refresh_token: null},
      {where: {id: clientData.id}, returning: true}
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Client logged out succesfully',
      client: updatedClient[1][0]
    };

    return response
  }

  async refreshToken(client_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (client_id != decodedToken['id']) {
      throw new BadRequestException('client not found');
    }
    const client = await this.clientRepo.findOne({where: {id: client_id}});
    if (!client || !client.hashed_refresh_token) {
      throw new BadRequestException('Client not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      client.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(client);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateClient = await this.clientRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: client.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Client logged in",
      client: updateClient[1][0],
      tokens,
    };

    return response;
  }

  async getTokens(client: Client) {
    const jwtpayload = {
      id: client.id,
      is_active: client.is_active,
      roles: client.roles
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtpayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_Token: accessToken,
      refresh_Token: refreshToken,
    };
  }

  async activate(link:string) {
    if(!link) {
      throw new BadRequestException('Activation link not found!');
    }

    const updatedClient = await this.clientRepo.update(
      { is_active: true },
      { where: {activation_link: link, is_active: false}, returning: true }
    );
    if (!updatedClient[1][0]) {
      throw new BadRequestException('Client already activated!');
    };
    const response = {
      message: 'Client succesfully activated!',
      client: updatedClient
    };

    return response;
  }

  async addRole(addRoleClientDto:AddRoleClientDto) {
    const client = await this.clientRepo.findByPk(addRoleClientDto.clientId);
    const role = await this.roleService.getRoleByValue(addRoleClientDto.value);

    if (role && client) {
      await client.$add('roles', role.id);
      const updatedClient = await this.clientRepo.findByPk(addRoleClientDto.clientId, {
        include: {all: true}
      });
      return updatedClient;
    }
    throw new HttpException(
      'Client or role not found!',
      HttpStatus.NOT_FOUND
    );
  }

  async removeRole(addRoleClientDto:AddRoleClientDto) {
    const client = await this.clientRepo.findByPk(addRoleClientDto.clientId);
    const role = await this.roleService.getRoleByValue(addRoleClientDto.value);

    if (role && client) {
      await client.$remove('roles', role.id);
      const updatedClient = await this.clientRepo.findByPk(addRoleClientDto.clientId, {
        include: {all: true}
      });
      return updatedClient;
    }
    throw new HttpException(
      'Client or role not found!',
      HttpStatus.NOT_FOUND
    );
  }
}