import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateClothesDto } from "./dto/create-clothes.dto";
import { UpdateClothesDto } from "./dto/update-clothes.dto";
import { Clothes } from "./model/clothes.model";

@Injectable()
export class ClothesService {
  constructor(
    @InjectModel(Clothes) private clothesRepo: typeof Clothes,
  ){}

  async createClothes(createClothesDto:CreateClothesDto) {
    const clothes = await this.clothesRepo.create(createClothesDto);
    return clothes;
  }

  async getAllClothes():Promise<Clothes[]> {
    const clothess = await this.clothesRepo.findAll({include: {all: true}});
    return clothess;
  }

  async getClothesById(id:number) {
    const clothes = await this.clothesRepo.findOne({where: {id}, include: {all: true}});
    return clothes;
  }

  async updateClothesById(id:number, updateClothesDto:UpdateClothesDto):Promise<Clothes> {
    const clothes = await this.clothesRepo.update(updateClothesDto, {where: {id}, returning: true});
    return clothes[1][0].dataValues;
  }

  async deleteClothesById(id:number) {
    const clothes = await this.clothesRepo.destroy({where: {id}})
    if (!clothes) {
      throw new HttpException('Clothes not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Clothes has deleted!"};
  }
}