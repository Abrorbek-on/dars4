import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { Post as PostModel } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(payload: any): Promise<PostModel> {
    const newPost = await this.prisma.post.create({
      data: payload,
    });
    return newPost;
  }

  async getAll(): Promise<PostModel[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        user: true,
      },
    });
    return posts;
  }

  async getOne(id: string): Promise<PostModel> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: string, payload: any): Promise<PostModel> {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: payload,
    });

    return updatedPost;
  }

  async delete(id: string): Promise<{ message: string }> {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.prisma.post.delete({ where: { id } });

    return { message: `Post with ID ${id} has been deleted` };
  }
}
