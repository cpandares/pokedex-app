import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';

import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';

import { EnvConfig } from './config/app.config';
import { JoiConfig } from './config/joi.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiConfig,
      load: [
        EnvConfig,
       
      ]
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
        
      },
    ),
    MongooseModule.forRoot( process.env.MONGO_DB! ),
    PokemonModule,  
    CommonModule,
    SeedModule,
  ],
  
})
export class AppModule {}
