import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/controller/Users.controllers';
import { UserService } from './users/service/user.service';
import { UserModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes("*")
  }
}
