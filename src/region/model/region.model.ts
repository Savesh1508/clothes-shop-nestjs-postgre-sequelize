import { Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Country } from "../../country/model/country.model";
// import { Market } from "../../market/model/market.model";
// import { Order } from "../../order/model/order.model";
// import { Client } from "../../client/model/client.model";

interface RegionAttributes{
  name:string;
  countryId:number;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someregion", description:"Region name"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @ApiProperty({example:1, description:"Country Id"})
  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  countryId: number;
  @BelongsTo(() => Country)
  country: Country

  // @HasMany(() => Market)
  // markets: Market[];

  // @HasMany(() => Client)
  // clients: Client[];

  // @HasMany(() => Order)
  // orders: Order[];
}