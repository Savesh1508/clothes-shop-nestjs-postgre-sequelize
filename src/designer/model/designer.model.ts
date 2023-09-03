import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Company } from "../../company/model/company.model";
import { Clothes } from "../../clothes/model/clothes.model";

interface DesignerAttributes{
  name:string;
  companyId:number;
}

@Table({ tableName: 'designer' })
export class Designer extends Model<Designer, DesignerAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"somedesigner", description:"Designer name"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @ApiProperty({example:1, description:"Country Id"})
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
  })
  companyId: number;
  @BelongsTo(() => Company)
  company: Company

  @ApiProperty({example:'someslink', description:"Designer official link"})
  @Column({
    type: DataType.STRING,
  })
  official_link: string;

  @ApiProperty({example:'somestext', description:"Designer description"})
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Clothes)
  designed_clothes: Clothes[];
}