import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Client } from "src/client/model/client.model";
import { Role } from "./role.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'client_roles', createdAt: false, updatedAt: false })
export class ClientRoles extends Model<ClientRoles> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Client Id'})
  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  clientId: number;

  @ApiProperty({ example: 1, description: 'Role Id'})
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
