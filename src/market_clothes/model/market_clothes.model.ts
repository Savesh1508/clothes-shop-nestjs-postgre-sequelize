import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Clothes } from "../../clothes/model/clothes.model";
import { Market } from "../../market/model/market.model";
import { Order } from "../../order/model/order.model";

interface MarketClothesAttributes{
  marketId:number;
  clothesId:number;
  clothes_price:number;
  description:string;
}

@Table({ tableName: 'market_clothes' })
export class MarketClothes extends Model<MarketClothes, MarketClothesAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:1, description:'Market Id'})
  @ForeignKey(() => Market)
  @Column({
    type: DataType.INTEGER,
  })
  marketId: number;
  @BelongsTo(() => Market)
  market: Market

  @ApiProperty({example:1, description:'Clothes Id'})
  @ForeignKey(() => Clothes)
  @Column({
    type: DataType.INTEGER,
  })
  clothesId: number;
  @BelongsTo(() => Clothes)
  clothes: Clothes

  @ApiProperty({example:1234.56, description:"Clothes price"})
  @Column({
    type: DataType.DECIMAL(8,2),
  })
  clothes_price: number;

  @ApiProperty({example:'sometext', description:"Clothes description"})
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  // @HasMany(() => Order)
  // orders:Order[]
}