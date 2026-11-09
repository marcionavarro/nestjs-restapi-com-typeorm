import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão definidas no DTO
      forbidNonWhitelisted: true, // Retorna um erro se houver propriedades que não estão definidas no DTO
      transform: false, // Transforma os tipos de dados para os tipos definidos em params e DTO
    }),
    new ParseIntIdPipe(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
