import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Company } from "../../company/model/company.model";
import { Clothes } from "../../clothes/model/clothes.model";

interface BrandAttributes{
  name:string;
  companyId:number;
}

@Table({ tableName: 'brand' })
export class Brand extends Model<Brand, BrandAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"somebrand", description:"Brands name"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @ApiProperty({example:1, description:"Company Id"})
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
  })
  companyId: number;
  @BelongsTo(() => Company)
  company: Company

  @HasMany(() => Clothes)
  brand_clothes: Clothes[];
}