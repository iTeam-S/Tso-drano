import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('iTeam-$ Community')
    .setDescription('La documentation des APIs de TSO-DRANO...')
    .setVersion('0.0.1')
    .addTag('EveryWhere')
    .addBearerAuth()
    .addServer('/api')
    .build();
  const document =  SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3143);
}
bootstrap();
