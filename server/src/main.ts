import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  });
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
