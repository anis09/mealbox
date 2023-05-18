import { Injectable } from '@nestjs/common';
import { GroceryModel } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import {
  GroceryCollection,
  GroceryDocument,
  GrocerySchemaName,
} from '../schemas';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class GroceryRepository {
  constructor(
    @InjectModel(GrocerySchemaName)
    private readonly groceryCollection: Model<GroceryCollection>,
  ) {}

  store(grocery: GroceryModel): Promise<void> {
    return this.transformToDocument(grocery).save().then();
  }

  transformToDocument(grocery: GroceryModel): GroceryDocument {
    return new this.groceryCollection(instanceToPlain(grocery));
  }
  findOneByUuid(uuid: string): Promise<GroceryModel | null> {
    return this.groceryCollection.findOne({ uuid }).then((result) => {
      if (!result) {
        return null;
      }

      const plain = result.toObject();
      delete plain._id;

      return plainToInstance(GroceryModel, plain);
    });
  }
  delete(grocery: GroceryModel): Promise<void> {
    return this.groceryCollection.deleteOne({ uuid: grocery.uuid }).then();
  }
  update(grocery: GroceryModel): Promise<any> {
    const groceryCollection = instanceToPlain(grocery);

    return this.groceryCollection

      .updateOne({ uuid: groceryCollection.uuid }, { ...groceryCollection })
      .then();
  }
  static transformToModel(grocery: GroceryDocument): GroceryModel {
    const groceryPlain = grocery.toObject();

    delete groceryPlain._id;
    delete groceryPlain.__v;

    return plainToInstance(GroceryModel, groceryPlain);
  }
  searchAll() {
    return this.groceryCollection
      .find()
      .limit(10)
      .exec()
      .then((documents) => documents.map(GroceryRepository.transformToModel));
  }
}
