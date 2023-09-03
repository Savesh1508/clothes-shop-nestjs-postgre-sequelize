import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/model/role.model";
import { MarketRoles } from "../../roles/model/market-roles.model";
import { Region } from "../../region/model/region.model";
import { MarketClothes } from "../../market_clothes/model/market_clothes.model";
import { Commentary } from "../../commentary/model/commentary.model";

interface MarketAttributes{
  name:string;
  email:string;
  hashed_password:string;
  description: string;
  phone:string;
  locationId:number;
  hashed_refresh_token: string;
}

@Table({ tableName: 'Market' })
export class Market extends Model<Market, MarketAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someMarket", description:"Market name"})
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Market email"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email:string;

  @ApiProperty({example:"Uzbek1$0n", description:"Market password"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  hashed_password: string;

  @ApiProperty({example:"somelink", description:"Market photo"})
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({example:"somelongtext", description:"Market description"})
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @ApiProperty({example:"+998900000000", description:"Market phone"})
  @Column({
    type: DataType.STRING,
  })
  phone:string;

  @ApiProperty({example:1, description:"Market location"})
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  locationId:number;
  @BelongsTo(() => Region)
  location: Region

  @ApiProperty({example: true, description:"Market activity"})
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  is_active:boolean;

  @ApiProperty({example:"somerefreshtoken", description:"Market hashed refresh token"})
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({example:"someactivationlink", description:"Market activation link"})
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => MarketClothes)
  market_clothes:MarketClothes[]

  @HasMany(() => Commentary)
  market_commentaries:Commentary[]

  @ApiProperty({ example: ['Roles'], description: 'Market roles'})
  @BelongsToMany(() => Role, () => MarketRoles)
  roles: Role[];
}