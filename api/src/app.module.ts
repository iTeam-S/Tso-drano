import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MembreModule } from './membre/membre.module';
import { SouhaitsModule } from './souhaits/souhaits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: +!process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/entities/*.js'],
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    AuthModule,
    MembreModule,
    SouhaitsModule,
  ]
})
export class AppModule {}
