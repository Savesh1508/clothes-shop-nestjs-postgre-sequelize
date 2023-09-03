import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { Brand } from "./model/brand.model";

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private brandRepo: typeof Brand,
  ){}

  async createBrand(createBrandDto:CreateBrandDto) {
    const brand = await this.brandRepo.create(createBrandDto);
    return brand;
  }

  async getAllBrands():Promise<Brand[]> {
    const brands = await this.brandRepo.findAll({include: {all: true}});
    return brands;
  }

  async getBrandById(id:number) {
    const brand = await this.brandRepo.findOne({where: {id}, include: {all: true}});
    return brand;
  }

  async updateBrandById(id:number, updateBrandDto:UpdateBrandDto):Promise<Brand> {
    const brand = await this.brandRepo.update(updateBrandDto, {where: {id}, returning: true});
    return brand[1][0].dataValues;
  }

  async deleteBrandById(id:number) {
    const brand = await this.brandRepo.destroy({where: {id}})
    if (!brand) {
      throw new HttpException('Brand not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Brand has deleted!"};
  }
}