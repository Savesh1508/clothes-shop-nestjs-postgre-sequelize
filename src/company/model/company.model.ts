import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Brand } from "../../brand/model/brand.model";
import { Designer } from "../../designer/model/designer.model";
import { Country } from "../../country/model/country.model";

interface CompanyAttributes{
  name:string;
  countryId:number;
  official_link:string;
  description:string;
}

@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"somecompany", description:"Company name"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @ApiProperty({example:1, description:"Country Id"})
  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
  })
  countryId: number;
  @BelongsTo(() => Country)
  country: Country

  @ApiProperty({example:'someslink', description:"Company official link"})
  @Column({
    type: DataType.STRING,
  })
  official_link: string;

  @ApiProperty({example:'somestext', description:"Company description"})
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @HasMany(() => Brand)
  company_brands: Brand[];

  @HasMany(() => Designer)
  company_designers: Designer[];
}