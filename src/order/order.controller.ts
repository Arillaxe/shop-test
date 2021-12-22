import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { Query } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async get(@Res() res: Response, @Query() query): Promise<any> {
    try {
      const { offset, limit } = query;
      const { orders, total } = await this.orderService.findAll({ offset, limit });

      res.json({ orders, total });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Res() res: Response, @Body() itemDto: CreateOrderDto): Promise<any> {
    try {
      const order = await this.orderService.create(itemDto);

      res.json({ order });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Res() res: Response, @Param('id') id: number): Promise<any> {
    try {
      await this.orderService.delete(id);

      res.status(200).end();
    } catch (e) {
      res.status(400).json(e);
    }
  }
}



