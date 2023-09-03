import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./model/order.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepo: typeof Order,
  ){}

  async createOrder(createOrderDto:CreateOrderDto) {
    const order = await this.orderRepo.create(createOrderDto);
    return order;
  }

  async getAllOrders():Promise<Order[]> {
    const orders = await this.orderRepo.findAll({include: {all: true}});
    return orders;
  }

  async getOrderById(id:number) {
    const order = await this.orderRepo.findOne({where: {id}, include: {all: true}});
    return order;
  }

  async updateOrderById(id:number, updateOrderDto:UpdateOrderDto):Promise<Order> {
    const order = await this.orderRepo.update(updateOrderDto, {where: {id}, returning: true});
    return order[1][0].dataValues;
  }

  async deleteOrderById(id:number) {
    const order = await this.orderRepo.destroy({where: {id}})
    if (!order) {
      throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Order has deleted!"};
  }
}