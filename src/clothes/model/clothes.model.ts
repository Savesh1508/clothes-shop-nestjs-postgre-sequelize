import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ClothesForWho, ClothesType } from "../dto/create-clothes.dto";
import { Country } from "../../country/model/country.model";
import { Designer } from "../../designer/model/designer.model";
import { Brand } from "../../brand/model/brand.model";
import { MarketClothes } from "../../market_clothes/model/market_clothes.model";

interface ClothesAttributes{
  name:string;
  clothes_type:ClothesType;
  madeInId:number;
  size:number;
  designerId:number;
  brandId:number;
  for_who:ClothesForWho;
}

@Table({ tableName: 'clothes' })
export class Clothes extends Model<Clothes, ClothesAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someclothes", description:"Clothes name"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @ApiProperty({example:'skirt', description:"Clothes type"})
  @Column({
    type: DataType.ENUM(...Object.values(ClothesType)),
  })
  clothes_type: ClothesType;

  @ApiProperty({example:1, description:"Clothes made in ..."})
  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
  })
  madeInId: number;
  @BelongsTo(() => Country)
  country: Country

  @ApiProperty({example:41, description:"Clothes size"})
  @Column({
    type: DataType.INTEGER,
  })
  size: number;

  @ApiProperty({example:1, description:"Clothes designer Id"})
  @ForeignKey(() => Designer)
  @Column({
    type: DataType.INTEGER,
  })
  designerId: number;
  @BelongsTo(() => Designer)
  designed_by: Designer

  @ApiProperty({example:1, description:"Clothes brand Id"})
  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
  })
  brandId: number;
  @BelongsTo(() => Brand)
  brand: Brand

  @ApiProperty({example:'man', description:"Clothes for who"})
  @Column({
    type: DataType.ENUM(...Object.values(ClothesForWho)),
  })
  score: ClothesForWho;

  @ApiProperty({example:'somephotolink', description:"Clothes photo link"})
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @HasMany(() => MarketClothes)
  clothes_in_markets:MarketClothes[]
}