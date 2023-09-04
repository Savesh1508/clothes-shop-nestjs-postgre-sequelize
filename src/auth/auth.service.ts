// import { Injectable, ForbiddenException, HttpException, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { AdminService } from '../admin/admin.service';
// import { CreateAdminDto } from '../admin/dto/create-admin.dto';
// import { ClientService } from '../client/client.service';
// import { CreateClientDto } from '../client/dto/create-client.dto';
// import { MailService } from '../mail/mail.service';
// import { CreateMarketDto } from '../market/dto/create-market.dto';
// import { MarketService } from '../market/market.service';
// import { RoleService } from '../roles/roles.service';
// import * as bcrypt from "bcrypt";
// import { Op } from "sequelize";
// import { Response } from "express";
// import { v4 as uuidv4 } from "uuid";
// import { InjectModel } from '@nestjs/sequelize';
// import { Client } from '../client/model/client.model';
// import { Admin } from '../admin/model/admin.model';
// import { Market } from '../market/model/market.model';
// import { getTokens } from '../helpers/jwtservice';
// import { LoginClientDto } from '../client/dto/login-client.dto';
// import { LoginAdminDto } from '../admin/dto/login-admin.dto';
// import { LoginMarketDto } from '../market/dto/login-market.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(Client) private clientRepo: typeof Client,
//     @InjectModel(Admin) private adminRepo: typeof Admin,
//     @InjectModel(Market) private marketRepo: typeof Market,
//     private readonly marketService: MarketService,
//     private readonly adminService: AdminService,
//     private readonly clientService: ClientService,
//     private readonly roleService: RoleService,
//     private readonly mailService: MailService,
//     private readonly jwtService: JwtService
//   ){}

//   async registration(createUserDto: CreateClientDto | CreateAdminDto | CreateMarketDto, res: Response) {
//     let user;
//     let userRepo;
//     let preparedRole: 'ADMIN' | 'CLIENT' | 'MARKET';

//     if (createUserDto instanceof CreateClientDto) {
//       user = await this.clientService.getClientByEmail(createUserDto.email);
//       userRepo = this.clientRepo;
//       preparedRole = 'CLIENT'
//     } else if (createUserDto instanceof CreateAdminDto) {
//       user = await this.adminService.getAdminByEmail(createUserDto.email);
//       userRepo = this.adminRepo;
//       preparedRole = 'ADMIN'
//     } else if (createUserDto instanceof CreateMarketDto) {
//       user = await this.marketService.getMarketByEmail(createUserDto.email);
//       userRepo = this.marketRepo;
//       preparedRole = 'MARKET'
//     }
//     if (user) {
//       throw new BadRequestException("Email already exists");
//     }
//     if (createUserDto.password !== createUserDto.confirm_password) {
//       throw new BadRequestException("Passwords is not match!");
//     }

//     const hashed_password = await bcrypt.hash(createUserDto.password, 7);
//     const newUser = await userRepo.create({
//       ...createUserDto,
//       hashed_password: hashed_password,
//     });


//     const role = await this.roleService.getRoleByValue(preparedRole);
//     if (!role) {
//       throw new BadRequestException('Role not found!');
//     }
//     await newUser.$set('roles', [role.id]);
//     await newUser.save();
//     newUser.roles = [role];

//     const tokens = await getTokens(newUser);
//     const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
//     const uniqueKey: string = uuidv4();

//     const updateUser = await userRepo.update(
//       {
//         hashed_refresh_token: hashed_refresh_token,
//         activation_link: uniqueKey,
//       },
//       { where: { id: newUser.id }, returning: true }
//     );

//     res.cookie("refresh_token", tokens.refresh_Token, {
//       maxAge: 15 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     });

//     try {
//       await this.mailService.sendClientConfirmation(updateUser[1][0].dataValues)
//     } catch (error) {
//       console.log(error);
//     }

//     const response = {
//       message: `${preparedRole} registred`,
//       client: updateUser[1][0],
//       tokens,
//     };
//     return response;
//   }

//   async login(loginDto: LoginClientDto | LoginAdminDto | LoginMarketDto, res: Response) {
//     let userRepo;

//     if (loginDto instanceof LoginClientDto) {
//       userRepo = this.clientRepo;
//     } else if (loginDto instanceof LoginAdminDto) {
//       userRepo = this.adminRepo;
//     } else if (loginDto instanceof LoginMarketDto) {
//       userRepo = this.marketRepo;
//     }
//     const { email, password } = loginDto
//     const user = await userRepo.findOne({
//       where: { email },
//     });

//     if (!user) {
//       throw new UnauthorizedException("You are not registered");
//     }
//     if (!user.is_active) {
//       throw new UnauthorizedException("You are not active");
//     }
//     const isMatchPass = await bcrypt.compare(password, user.hashed_password);
//     if (!isMatchPass) {
//       throw new UnauthorizedException('You are not registered')
//     }

//     const tokens = await getTokens(user);
//     const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
//     const updateUser = await userRepo.update(
//       { hashed_refresh_token: hashed_refresh_token },
//       { where: { id: user.id }, returning: true }
//     );

//     res.cookie("refresh_token", tokens.refresh_Token, {
//       maxAge: 15 * 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     });
//     const response = {
//       message: "You are logged in",
//       client: updateUser[1][0],
//       tokens,
//     };
//     return response;
//   }

//   async logout(refreshToken: string, res: Response) {
//     const userData = await this.jwtService.verify(refreshToken, {
//       secret: process.env.REFRESH_TOKEN_KEY
//     });
//     if (!userData) {
//       throw new ForbiddenException('User not found');
//     }
//     const updatedClient = await this.clientRepo.update(
//       {hashed_refresh_token: null},
//       {where: {id: userData.id}, returning: true}
//     );

//     res.clearCookie('refresh_token');
//     const response = {
//       message: 'You are logged out succesfully',
//       client: updatedClient[1][0]
//     };

//     return response
//   }
// }
