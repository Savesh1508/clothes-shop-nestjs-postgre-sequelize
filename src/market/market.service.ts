import { HttpException, HttpStatus, BadRequestException, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { RoleService } from "src/roles/roles.service";
import { AddRoleMarketDto } from "./dto/add-role.dto";
import { CreateMarketDto } from "./dto/create-market.dto";
import { UpdateMarketDto } from "./dto/update-market.dto";
import { Market } from "./model/market.model";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "src/mail/mail.service";
import { LoginMarketDto } from "./dto/login-market.dto";

@Injectable()
export class MarketService {
  constructor(
    @InjectModel(Market) private marketRepo: typeof Market,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
  ){}

  async createMarket(createMarketDto:CreateMarketDto, res: Response) {
    const market = await this.marketRepo.findOne({
      where: { email: createMarketDto.email },
    });
    if (market) {
      throw new BadRequestException("Email already exists");
    }
    if (createMarketDto.password !== createMarketDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createMarketDto.password, 7);
    const newMarket = await this.marketRepo.create({
      ...createMarketDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('MARKET');
    // const role = await this.roleService.getRoleByValue('ADMIN');
    // const role = await this.roleService.getRoleByValue('SUPERADMIN');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await market.$set('roles', [role.id]);
    await market.save();
    market.roles = [role];

    const tokens = await this.getTokens(newMarket);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();
    const updateMarket = await this.marketRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newMarket.id }, returning: true }
    );
    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMarketConfirmation(updateMarket[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    return newMarket;
  }

  async getAllMarkets():Promise<Market[]> {
    const markets = await this.marketRepo.findAll({include: {all: true}});
    return markets;
  }

  async getMarketById(id:number) {
    const market = await this.marketRepo.findOne({where: {id}, include: {all: true}});
    return market;
  }

  async getMarketByEmail(email:string) {
    const market = await this.marketRepo.findOne({where: {email}, include: {all: true}});
    return market;
  }

  async updateMarketById(id:number, updateMarketDto:UpdateMarketDto):Promise<Market> {
    const market = await this.marketRepo.update(updateMarketDto, {where: {id}, returning: true});
    return market[1][0].dataValues;
  }

  async deleteMarketById(id:number) {
    const market = await this.marketRepo.destroy({where: {id}})
    if (!market) {
      throw new HttpException('Market not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Market has deleted!"};
  }

  async registration(createMarketDto: CreateMarketDto, res: Response) {
    const market = await this.marketRepo.findOne({
      where: { email: createMarketDto.email },
    });
    if (market) {
      throw new BadRequestException("Email already exists");
    }
    if (createMarketDto.password !== createMarketDto.confirm_password) {
      throw new BadRequestException("passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(createMarketDto.password, 7);
    const newMarket = await this.marketRepo.create({
      ...createMarketDto,
      hashed_password: hashed_password,
    });

    const role = await this.roleService.getRoleByValue('MARKET');
    if (!role) {
      throw new BadRequestException('Role not found!');
    }
    await newMarket.$set('roles', [role.id]);
    await newMarket.save();
    newMarket.roles = [role];

    const tokens = await this.getTokens(newMarket);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const uniqueKey: string = uuidv4();

    const updateMarket = await this.marketRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newMarket.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendMarketConfirmation(updateMarket[1][0].dataValues)
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: "Market registred",
      market: updateMarket[1][0],
      tokens,
    };
    return response;
  }

  async login(loginMarketDto: LoginMarketDto, res: Response) {
    const { email, password } = loginMarketDto
    const market = await this.marketRepo.findOne({
      where: { email },
    });

    if (!market) {
      throw new UnauthorizedException("Market is not registered");
    }
    if (!market.is_active) {
      throw new UnauthorizedException("Market is not active");
    }
    const isMatchPass = await bcrypt.compare(password, market.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Market is not registered(pss)')
    }

    const tokens = await this.getTokens(market);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateMarket = await this.marketRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: market.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Market logged in",
      market: updateMarket[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const marketData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY
    });
    if (!marketData) {
      throw new ForbiddenException('Market not found');
    }
    const updatedMarket = await this.marketRepo.update(
      {hashed_refresh_token: null},
      {where: {id: marketData.id}, returning: true}
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Market logged out succesfully',
      market: updatedMarket[1][0]
    };

    return response
  }

  async refreshToken(market_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (market_id != decodedToken['id']) {
      throw new BadRequestException('market not found');
    }
    const market = await this.marketRepo.findOne({where: {id: market_id}});
    if (!market || !market.hashed_refresh_token) {
      throw new BadRequestException('Market not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      market.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(market);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_Token, 7);
    const updateMarket = await this.marketRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: market.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_Token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "Market logged in",
      market: updateMarket[1][0],
      tokens,
    };

    return response;
  }

  async getTokens(market: Market) {
    const jwtpayload = {
      id: market.id,
      is_active: market.is_active,
      roles: market.roles
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

    const updatedMarket = await this.marketRepo.update(
      { is_active: true },
      { where: {activation_link: link, is_active: false}, returning: true }
    );
    if (!updatedMarket[1][0]) {
      throw new BadRequestException('Market already activated!');
    };
    const response = {
      message: 'Market succesfully activated!',
      market: updatedMarket
    };

    return response;
  }

  async addRole(addRoleMarketDto:AddRoleMarketDto) {
    const market = await this.marketRepo.findByPk(addRoleMarketDto.marketId);
    const role = await this.roleService.getRoleByValue(addRoleMarketDto.value);

    if (role && market) {
      await market.$add('roles', role.id);
      const updatedMarket = await this.marketRepo.findByPk(addRoleMarketDto.marketId, {
        include: {all: true}
      });
      return updatedMarket;
    }
    throw new HttpException(
      'Market or role not found!',
      HttpStatus.NOT_FOUND
    );
  }

  async removeRole(addRoleMarketDto:AddRoleMarketDto) {
    const market = await this.marketRepo.findByPk(addRoleMarketDto.marketId);
    const role = await this.roleService.getRoleByValue(addRoleMarketDto.value);

    if (role && market) {
      await market.$remove('roles', role.id);
      const updatedMarket = await this.marketRepo.findByPk(addRoleMarketDto.marketId, {
        include: {all: true}
      });
      return updatedMarket;
    }
    throw new HttpException(
      'Market or role not found!',
      HttpStatus.NOT_FOUND
    );
  }
}