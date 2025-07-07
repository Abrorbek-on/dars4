import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  create(@Body() payload: any) {
    return this.postService.create(payload);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postService.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.postService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
