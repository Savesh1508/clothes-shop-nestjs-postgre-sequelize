import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Company } from "../../company/model/company.model";
import { Region } from "../../region/model/region.model";
import { Clothes } from "../../clothes/model/clothes.model";

interface CountryAttributes{
  name:string;
}

@Table({ tableName: 'Country' })
export class Country extends Model<Country, CountryAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someCountry", description:"Country name"})
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @HasMany(() => Region)
  regions: Region[];

  // @HasMany(() => Company)
  // country_companies: Company[];

  // @HasMany(() => Clothes)
  // country_maded_clothes: Clothes[];
}