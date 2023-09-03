import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCommentaryDto } from "./dto/create-commentary.dto";
import { UpdateCommentaryDto } from "./dto/update-commentary.dto";
import { Commentary } from "./model/commentary.model";

@Injectable()
export class CommentaryService {
  constructor(
    @InjectModel(Commentary) private commentaryRepo: typeof Commentary,
  ){}

  async createCommentary(createCommentaryDto:CreateCommentaryDto) {
    const commentary = await this.commentaryRepo.create(createCommentaryDto);
    return commentary;
  }

  async getAllCommentarys():Promise<Commentary[]> {
    const commentarys = await this.commentaryRepo.findAll({include: {all: true}});
    return commentarys;
  }

  async getCommentaryById(id:number) {
    const commentary = await this.commentaryRepo.findOne({where: {id}, include: {all: true}});
    return commentary;
  }

  async updateCommentaryById(id:number, updateCommentaryDto:UpdateCommentaryDto):Promise<Commentary> {
    const commentary = await this.commentaryRepo.update(updateCommentaryDto, {where: {id}, returning: true});
    return commentary[1][0].dataValues;
  }

  async deleteCommentaryById(id:number) {
    const commentary = await this.commentaryRepo.destroy({where: {id}})
    if (!commentary) {
      throw new HttpException('Commentary not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Commentary has deleted!"};
  }
}