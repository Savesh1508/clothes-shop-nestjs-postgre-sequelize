import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { Region } from "./model/region.model";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private regionRepo: typeof Region,
  ){}

  async createRegion(createRegionDto:CreateRegionDto) {
    const region = await this.regionRepo.create(createRegionDto);
    return region;
  }

  async getAllRegions():Promise<Region[]> {
    const regions = await this.regionRepo.findAll({include: {all: true}});
    return regions;
  }

  async getRegionById(id:number) {
    const region = await this.regionRepo.findOne({where: {id}, include: {all: true}});
    return region;
  }

  async updateRegionById(id:number, updateRegionDto:UpdateRegionDto):Promise<Region> {
    const region = await this.regionRepo.update(updateRegionDto, {where: {id}, returning: true});
    return region[1][0].dataValues;
  }

  async deleteRegionById(id:number) {
    const region = await this.regionRepo.destroy({where: {id}})
    if (!region) {
      throw new HttpException('Region not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Region has deleted!"};
  }
}