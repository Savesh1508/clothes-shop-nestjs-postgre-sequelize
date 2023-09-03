import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./role.model";
import { ApiProperty } from "@nestjs/swagger";
import { Market } from "../../market/model/market.model";

@Table({ tableName: 'market_roles', createdAt: false, updatedAt: false })
export class MarketRoles extends Model<MarketRoles> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Market Id'})
  @ForeignKey(() => Market)
  @Column({ type: DataType.INTEGER })
  marketId: number;

  @ApiProperty({ example: 1, description: 'Role Id'})
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
