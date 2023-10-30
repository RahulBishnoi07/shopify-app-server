import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applicationConfig } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const res = await app.listen(applicationConfig.app.port, '0.0.0.0');
  const serverAddress = res.address();
  
  console.log(
    `⚡ Server is listening at http://${serverAddress.address}:${serverAddress.port}`,
  );
}
bootstrap();
