import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMarketClothesDto } from "./dto/create-market_clothes.dto";
import { UpdateMarketClothesDto } from "./dto/update-market_clothes.dto";
import { MarketClothes } from "./model/market_clothes.model";

@Injectable()
export class MarketClothesService {
  constructor(
    @InjectModel(MarketClothes) private marketClothesRepo: typeof MarketClothes,
  ){}

  async createMarketClothes(createMarketClothesDto:CreateMarketClothesDto) {
    const marketClothes = await this.marketClothesRepo.create(createMarketClothesDto);
    return marketClothes;
  }

  async getAllMarketClothes():Promise<MarketClothes[]> {
    const marketClothes = await this.marketClothesRepo.findAll({include: {all: true}});
    return marketClothes;
  }

  async getMarketClothesById(id:number) {
    const marketClothes = await this.marketClothesRepo.findOne({where: {id}, include: {all: true}});
    return marketClothes;
  }

  async updateMarketClothesById(id:number, updateMarketClothesDto:UpdateMarketClothesDto):Promise<MarketClothes> {
    const marketClothes = await this.marketClothesRepo.update(updateMarketClothesDto, {where: {id}, returning: true});
    return marketClothes[1][0].dataValues;
  }

  async deleteMarketClothesById(id:number) {
    const marketClothes = await this.marketClothesRepo.destroy({where: {id}})
    if (!marketClothes) {
      throw new HttpException('Market clothes not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Market clothes has deleted!"};
  }
}