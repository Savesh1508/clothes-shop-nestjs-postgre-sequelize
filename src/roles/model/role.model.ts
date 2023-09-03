import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Client } from "src/client/model/client.model";
import { ClientRoles } from "./client-roles.model";
import { ApiProperty } from "@nestjs/swagger";
import { AdminRoles } from "./admin-roles.model";
import { Market } from "src/market/model/market.model";
import { MarketRoles } from "./market-roles.model";
import { Admin } from "../../admin/model/admin.model";

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Unikal ID'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example:"USER", description:"Client role"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  value: string;
z
  @ApiProperty({example:"USER role", description:"Info about clients role"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  // @BelongsToMany(() => Client, () => ClientRoles)
  // clients: Client[];

  // @BelongsToMany(() => Admin, () => AdminRoles)
  // admins: Admin[];

  // @BelongsToMany(() => Market, () => MarketRoles)
  // markets: Market[];
}
