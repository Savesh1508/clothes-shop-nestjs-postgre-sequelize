import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './model/order.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @ApiOperation({summary:"Create order"})
  @ApiResponse({status: 200, description: 'New order', type: [Order]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto):Promise<Order>{
    const order = await this.orderService.createOrder(createOrderDto);
    return order;
  }

  @ApiOperation({summary:"Get all orders"})
  @ApiResponse({status: 200, description: 'List of orders', type: [Order]})
  @Get()
  async getAllOrders():Promise<Order[]>{
    const orders = await this.orderService.getAllOrders();
    return orders;
  }

  @ApiOperation({summary:"Get order by Id"})
  @ApiResponse({status: 200, description: 'Order by Id', type: [Order]})
  @Get(':id')
  async getOrderById(@Param('id') id: string):Promise<Order>{
    const order = await this.orderService.getOrderById(+id);
    return order;
  }

  @ApiOperation({summary:"Update order by Id"})
  @ApiResponse({status: 200, description: 'Updated order', type: [Order]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateOrderById(@Param('id') id:string, @Body() updateComanyDto: UpdateOrderDto):Promise<Order>{
    const order = await this.orderService.updateOrderById(+id, updateComanyDto);
    return order;
  }

  @ApiOperation({summary:"Delete order by Id"})
  @ApiResponse({status: 200, description: 'Deleted order', type: [Order]})
  @Roles('SUPERADMIN', 'ADMIN', 'MARKET')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string) {
    const order = await this.orderService.deleteOrderById(+id);
    return order;
  }
}
