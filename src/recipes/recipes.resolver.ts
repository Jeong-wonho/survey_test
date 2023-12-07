import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';
import { NotFoundException } from '@nestjs/common';
import { RecipesArgs } from './dto/recipes.args';
import { NewRecipeInput } from './dto/new-recipe.input';

const pubsub = new PubSub();

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query((returns) => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation((returns) => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubsub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation((returns) => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  //recipeAdded 메서드를 구독하고, 해당 이벤트가 발생할 때마다 새로운 레시피를 반환한다.
  @Subscription((returns) => Recipe)
  recipeAdded() {
    return pubsub.asyncIterator('recipeAdded');
  }
}
