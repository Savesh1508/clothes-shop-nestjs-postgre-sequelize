import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDesignerDto } from "./dto/create-designer.dto";
import { UpdateDesignerDto } from "./dto/update-designer.dto";
import { Designer } from "./model/designer.model";

@Injectable()
export class DesignerService {
  constructor(
    @InjectModel(Designer) private designerRepo: typeof Designer,
  ){}

  async createDesigner(createDesignerDto:CreateDesignerDto) {
    const designer = await this.designerRepo.create(createDesignerDto);
    return designer;
  }

  async getAllDesigners():Promise<Designer[]> {
    const designers = await this.designerRepo.findAll({include: {all: true}});
    return designers;
  }

  async getDesignerById(id:number) {
    const designer = await this.designerRepo.findOne({where: {id}, include: {all: true}});
    return designer;
  }

  async updateDesignerById(id:number, updateDesignerDto:UpdateDesignerDto):Promise<Designer> {
    const designer = await this.designerRepo.update(updateDesignerDto, {where: {id}, returning: true});
    return designer[1][0].dataValues;
  }

  async deleteDesignerById(id:number) {
    const designer = await this.designerRepo.destroy({where: {id}})
    if (!designer) {
      throw new HttpException('Designer not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Designer has deleted!"};
  }
}