import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../roles/model/role.model";
import { ClientRoles } from "../../roles/model/client-roles.model";
import { Region } from "../../region/model/region.model";
import { Commentary } from "../../commentary/model/commentary.model";
import { Order } from "../../order/model/order.model";

interface ClientAttributes{
  name:string;
  email:string;
  hashed_password:string;
  phone:string;
  locationId:number;
  hashed_refresh_token: string;
}

@Table({ tableName: 'Client' })
export class Client extends Model<Client, ClientAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someClient", description:"Client name"})
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Client email"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email:string;

  @ApiProperty({example:"Uzbek1$0n", description:"Client password"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  hashed_password: string;

  @ApiProperty({example:"+998900000000", description:"Client phone"})
  @Column({
    type: DataType.STRING,
  })
  phone:string;


  @ApiProperty({example:1, description:"Client location"})
  // @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  locationId:number;
  // @BelongsTo(() => Region)
  // location: Region

  @ApiProperty({example: true, description:"Client activity"})
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  is_active:boolean;

  @ApiProperty({example:"somerefreshtoken", description:"Client hashed refresh token"})
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({example:"someactivationlink", description:"Client activation link"})
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => Order)
  client_orders:Order[]

  // @HasMany(() => Commentary)
  // client_commentaries:Commentary[]

  @ApiProperty({ example: ['Roles'], description: 'Client roles'})
  @BelongsToMany(() => Role, () => ClientRoles)
  roles: Role[];
}