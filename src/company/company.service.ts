import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./model/company.model";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private companyRepo: typeof Company,
  ){}

  async createCompany(createCompanyDto:CreateCompanyDto) {
    const company = await this.companyRepo.create(createCompanyDto);
    return company;
  }

  async getAllCompanys():Promise<Company[]> {
    const companys = await this.companyRepo.findAll({include: {all: true}});
    return companys;
  }

  async getCompanyById(id:number) {
    const company = await this.companyRepo.findOne({where: {id}, include: {all: true}});
    return company;
  }

  async updateCompanyById(id:number, updateCompanyDto:UpdateCompanyDto):Promise<Company> {
    const company = await this.companyRepo.update(updateCompanyDto, {where: {id}, returning: true});
    return company[1][0].dataValues;
  }

  async deleteCompanyById(id:number) {
    const company = await this.companyRepo.destroy({where: {id}})
    if (!company) {
      throw new HttpException('Company not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Company has deleted!"};
  }
}