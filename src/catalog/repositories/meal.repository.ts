import { Injectable } from '@nestjs/common';
import { MealModel } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import { MealCollection, MealDocument, MealSchemaName } from '../schemas';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class MealRepository {
  constructor(
    @InjectModel(MealSchemaName)
    private readonly mealCollection: Model<MealCollection>,
  ) {}

  store(meal: MealModel): Promise<void> {
    return this.transformToDocument(meal).save().then();
  }

  bulkStore(meals: MealModel[]) {
    return this.mealCollection.bulkSave(meals.map(this.transformToDocument));
  }

  transformToDocument(meal: MealModel): MealDocument {
    return new this.mealCollection(instanceToPlain(meal));
  }

  transformToModel(meal: MealDocument): MealModel {
    return plainToInstance(MealModel, meal.toObject());
  }

  count() {
    return this.mealCollection.count().exec();
  }

  update(meal: MealModel): Promise<any> {
    const mealCollection = instanceToPlain(meal);

    return this.mealCollection

      .updateOne({ uuid: mealCollection.uuid }, { ...mealCollection })
      .then();
  }
  delete(meal: MealModel): Promise<void> {
    return this.mealCollection.deleteOne({ uuid: meal.uuid }).then();
  }

  findOneByUuid(uuid: string): Promise<MealModel | null> {
    return this.mealCollection.findOne({ uuid }).then((result) => {
      if (!result) {
        return null;
      }

      const plain = result.toObject();
      delete plain._id;

      return plainToInstance(MealModel, plain);
    });
  }
  static transformToModel(meal: MealDocument): MealModel {
    const mealPlain = meal.toObject();

    delete mealPlain._id;
    delete mealPlain.__v;

    return plainToInstance(MealModel, mealPlain);
  }
  searchAll() {
    return this.mealCollection
      .find()
      .limit(10)
      .exec()
      .then((documents) => documents.map(MealRepository.transformToModel));
  }
}
