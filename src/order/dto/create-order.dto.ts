import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum Status {
  completed = 'completed',
  waiting = 'waiting',
  stopped = 'stopped',
  cancelled = 'cancelled',
  market_accepted = 'market accepted',
  market_prepared = 'markeе prepared',
  delivery_accepted = 'accepted delivery center',
  order_way = 'order on way',
  reception_accepted = 'reception accepted',
  courier_accepted = 'courier accepted',
}

export enum DeliveryType {
  pickup = 'pickup',
  to_home = 'to home',
  to_post_centre = 'to post centre',
}

export enum Payment {
  cash = 'cash',
  visa = 'visa',
  mastercard = 'mastercard',
  uzcard = 'uzcard',
  humo = 'humo',
  webmoney = 'webmoney',
  qiwi = 'qiwi',
}

export enum CurrencyType {
  usd = 'USD',
  uzs = 'UZS',
  rub = 'RUB',
}

export class CreateOrderDto {
  @ApiProperty({example:"completed", description:"Order status"})
  @IsEnum(Status, { message: 'Invalid status type'})
  status: Status;

  @ApiProperty({example:1, description:"Market clothes Id"})
  @IsNumber()
  market_clothesId: number;

  @ApiProperty({example:1, description:"Client Id"})
  @IsNumber()
  clientId: number;

  @ApiProperty({example:"pickup", description:"Order delivery type"})
  @IsEnum(DeliveryType, { message: 'Invalid delivery type'})
  delivery_type: DeliveryType;

  @ApiProperty({example:"cash", description:"Order payment method"})
  @IsEnum(Payment, { message: 'Invalid payment method type'})
  payment_method: Payment;

  @ApiProperty({example:'sometext', description:"Comment to order"})
  @IsString()
  comment: string;

  @ApiProperty({example:1234.56, description:"Order delivery price"})
  @IsNumber()
  delivery_price: number;

  @ApiProperty({example:1234.56, description:"Order summary price"})
  @IsNumber()
  summary: number;

  @ApiProperty({example:"USD", description:"Order currency name"})
  @IsEnum(CurrencyType, { message: 'Invalid currency'})
  order_currency: CurrencyType;

  @ApiProperty({example:1, description:"Order address Id"})
  @IsNumber()
  address_to_deliveryId: number;
}
