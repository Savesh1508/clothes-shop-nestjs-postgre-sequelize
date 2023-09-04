import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './model/client.model';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Role } from 'src/roles/model/role.model';
import { RolesModule } from 'src/roles/roles.module';
import { ClientRoles } from 'src/roles/model/client-roles.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Client, Role, ClientRoles]),
    JwtModule.register({}),
    MailModule,
    RolesModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}




