import { InputType, Int, PickType, Field, ID } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@InputType()
export class ConnectTypeBelongsTo {
  @Field(() => ID)
  connect: number;
}

@InputType()
export class CreateCategoryInput extends PickType(Category, [
  'name',
  'details',
  'icon',
  'image',
  'slug',
]) {
  @Field(() => ID, { nullable: true })
  parent?: number;
  @Field(() => ID, { nullable: true })
  type_id?: number;
  type?: ConnectTypeBelongsTo;
  language?: string;
}