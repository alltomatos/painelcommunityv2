import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para integração frontend-backend
  app.enableCors({
    origin: '*', // Em produção, restringir para domínios confiáveis
    credentials: true,
  });

  const config = new DocumentBuilder()
      .setTitle('MarketplaceDB API')
  .setDescription('Documentação da API do MarketplaceDB')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
