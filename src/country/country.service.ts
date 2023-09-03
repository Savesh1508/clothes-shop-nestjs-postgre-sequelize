import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { Country } from "./model/country.model";

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country) private countryRepo: typeof Country,
  ){}

  async createCountry(createCountryDto:CreateCountryDto) {
    const country = await this.countryRepo.create(createCountryDto);
    return country;
  }

  async getAllCountrys():Promise<Country[]> {
    const countrys = await this.countryRepo.findAll({include: {all: true}});
    return countrys;
  }

  async getCountryById(id:number) {
    const country = await this.countryRepo.findOne({where: {id}, include: {all: true}});
    return country;
  }

  async updateCountryById(id:number, updateCountryDto:UpdateCountryDto):Promise<Country> {
    const country = await this.countryRepo.update(updateCountryDto, {where: {id}, returning: true});
    return country[1][0].dataValues;
  }

  async deleteCountryById(id:number) {
    const country = await this.countryRepo.destroy({where: {id}})
    if (!country) {
      throw new HttpException('Country not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Country has deleted!"};
  }
}