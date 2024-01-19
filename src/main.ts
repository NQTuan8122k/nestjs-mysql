import { NestFactory } from '@nestjs/core';
import { GraphqlValidationFilter } from 'nestjs-better-validation';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './exception-filters/global.filter';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new GraphqlValidationFilter(),
    new HttpExceptionFilter(),
    new AnyExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
