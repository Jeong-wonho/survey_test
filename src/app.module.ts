import { Module } from '@nestjs/common';
// import { SurveyModule } from './survey/survey.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './configs/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { HelloResolver } from './hello.resolver';
import { PetsModule } from './pets/pets.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // SurveyModule,
    PetsModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
