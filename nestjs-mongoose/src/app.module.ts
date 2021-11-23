import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShapesModule } from './shapes/shapes.module';
import { UsersModule } from './users/users.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    ShapesModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/nestjs-playground', {
      autoIndex: true,
    }),
    AnimalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
