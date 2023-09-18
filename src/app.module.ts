import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { Admin } from './admin/model/admin.model';
import { Client } from './client/model/client.model';
import { Market } from './market/model/market.model';
import { Role } from './roles/model/role.model';
import { AdminRoles } from './roles/model/admin-roles.model';
import { ClientRoles } from './roles/model/client-roles.model';
import { MarketRoles } from './roles/model/market-roles.model';
import { RolesModule } from './roles/roles.module';
import { MarketModule } from './market/market.module';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { CountryModule } from './country/country.module';
import { Country } from './country/model/country.model';
import { Region } from './region/model/region.model';
import { RegionModule } from './region/region.module';
import { CompanyModule } from './company/company.module';
import { Company } from './company/model/company.model';
import { DesignerModule } from './designer/designer.module';
import { Designer } from './designer/model/designer.model';
import { BrandModule } from './brand/brand.module';
import { CommentaryModule } from './commentary/commentary.module';
import { Commentary } from './commentary/model/commentary.model';
import { ClothesModule } from './clothes/clothes.module';
import { MarketClothesModule } from './market_clothes/market_clothes.module';
import { OrderModule } from './order/order.module';
import { Clothes } from './clothes/model/clothes.model';
import { MarketClothes } from './market_clothes/model/market_clothes.model';
import { Order } from './order/model/order.model';
import { Brand } from './brand/model/brand.model';
import { SharedModule } from './shared/shared.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Brand,
        Client,
        Clothes,
        Commentary,
        Company,
        Country,
        Designer,
        Market,
        MarketClothes,
        Order,
        Region,
        Role,
        AdminRoles,
        ClientRoles,
        MarketRoles,
      ],
      autoLoadModels: true,
      logging: true
    }),
    AdminModule,
    BrandModule,
    ClientModule,
    ClothesModule,
    CommentaryModule,
    CompanyModule,
    CountryModule,
    DesignerModule,
    MailModule,
    MarketModule,
    MarketClothesModule,
    OrderModule,
    RegionModule,
    RolesModule,
    // AuthModule,
    SharedModule
  ],
  controllers: [],
  providers: [AppService],
  exports: []
})
export class AppModule {}
