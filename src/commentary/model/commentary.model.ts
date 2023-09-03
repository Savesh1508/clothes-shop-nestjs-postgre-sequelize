import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Score } from "../dto/create-commentary.dto";
import { Client } from "../../client/model/client.model";
import { Market } from "../../market/model/market.model";

interface CommentaryAttributes{
  clientId:number;
  marketId:number;
  commentary:string;
  score:Score;
}

@Table({ tableName: 'commentary' })
export class Commentary extends Model<Commentary, CommentaryAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:1, description:"Client Id"})
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  clientId: number;

  @ApiProperty({example:1, description:"Market Id"})
  @ForeignKey(() => Market)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  marketId: number;
  // @BelongsTo(() => Market)
  // market: Market

  @ApiProperty({example:'sometext', description:"Commentary to market"})
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  commentary: string;

  @ApiProperty({example:'good', description:"Score to market"})
  @Column({
    type: DataType.ENUM(...Object.values(Score)),
    allowNull: false
  })
  score: Score;
}