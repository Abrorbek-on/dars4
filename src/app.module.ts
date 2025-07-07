import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './core/database/prisma.module';
import { UsersController } from './modules/users/users.controller';
import { PostsController } from './modules/posts/posts.controller';
import { PostsModule } from './modules/posts/posts.module';


@Module({
  imports: [PrismaModule, UsersModule, PostsModule],
  controllers: [ UsersController, PostsController],
  providers: [ UsersService],
})
export class AppModule {}
