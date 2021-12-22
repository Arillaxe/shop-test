import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemService } from './item.service';
import { CreateItemDto } from './item.dto';
import { Query } from '@nestjs/common';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async get(@Res() res: Response, @Query() query): Promise<any> {
    try {
      const { offset, limit } = query;
      const { items, total } = await this.itemService.findAll({ offset, limit });

      res.json({ items, total });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Res() res: Response, @Body() itemDto: CreateItemDto): Promise<any> {
    try {
      const item = await this.itemService.create(itemDto);

      res.json({ item });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Res() res: Response, @Param('id') id: number): Promise<any> {
    try {
      await this.itemService.delete(id);

      res.status(200).end();
    } catch (e) {
      res.status(400).json(e);
    }
  }
}



