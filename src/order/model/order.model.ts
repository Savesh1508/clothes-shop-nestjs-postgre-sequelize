import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { DeliveryType, Payment, Status, CurrencyType } from "../dto/create-order.dto";
import { Region } from "../../region/model/region.model";
import { MarketClothes } from "../../market_clothes/model/market_clothes.model";
import { Client } from "../../client/model/client.model";

interface OrderAttributes{
  status:Status,
  market_clothesId:number,
  clientId:number,
  delivery_type:DeliveryType,
  payment_metohd:Payment,
  comment:string,
  delivery_price:number,
  summary:number,
  order_currency: CurrencyType,
  address_to_deliveryId:number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"completed", description:"Order status"})
  @Column({
    type: DataType.ENUM(...Object.values(Status)),
  })
  status: Status;

  @ApiProperty({example:1, description:"Market clothes Id"})
  @ForeignKey(() => MarketClothes)
  @Column({
    type: DataType.INTEGER,
  })
  market_clothesId: number;
  @BelongsTo(() => MarketClothes)
  market_service: MarketClothes

  @ApiProperty({example:1, description:"Client Id"})
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
  })
  clientId: number;
  @BelongsTo(() => Client)
  client_data: Client

  @ApiProperty({example:"pickup", description:"Order delivery type"})
  @Column({
    type: DataType.ENUM(...Object.values(DeliveryType)),
  })
  delivery_type: DeliveryType;


  @ApiProperty({example:"cash", description:"Order payment method"})
  @Column({
    type: DataType.ENUM(...Object.values(Payment)),
  })
  payment_method: Payment;

  @ApiProperty({example:'sometext', description:"Comment to order"})
  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @ApiProperty({example:1234.56, description:"Order delivery price"})
  @Column({
    type: DataType.DECIMAL(8,2),
  })
  delivery_price: number;

  @ApiProperty({example:1234.56, description:"Order summary price"})
  @Column({
    type: DataType.DECIMAL(8,2),
    allowNull: false
  })
  summary: number;

  @ApiProperty({example:"USD", description:"Order currency name"})
  @Column({
    type: DataType.ENUM(...Object.values(CurrencyType)),
  })
  order_currency: CurrencyType;

  @ApiProperty({example:1, description:"Order address Id"})
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  address_to_deliveryId: number;
  @BelongsTo(() => Region)
  address_to_delivery: Region
}