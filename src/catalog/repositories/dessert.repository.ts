import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DessertCollection } from '../schemas';
import { Model } from 'mongoose';
import { DessertDocument, DessertSchemaName } from '../schemas/dessert.schema';
import { DessertModel } from '../models/dessert.model';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class DessertRepository {
  constructor(
    @InjectModel(DessertSchemaName)
    private readonly dessertCollection: Model<DessertCollection>,
  ) {}

  store(meal: DessertModel): Promise<void> {
    return this.transformToDocument(meal).save().then();
  }

  transformToDocument(meal: DessertModel): DessertDocument {
    return new this.dessertCollection(instanceToPlain(meal));
  }
  findOneByUuid(uuid: string): Promise<DessertModel | null> {
    return this.dessertCollection.findOne({ uuid }).then((result) => {
      if (!result) {
        return null;
      }

      const plain = result.toObject();
      delete plain._id;

      return plainToInstance(DessertModel, plain);
    });
  }
  delete(dessert: DessertModel): Promise<void> {
    return this.dessertCollection.deleteOne({ uuid: dessert.uuid }).then();
  }
  update(dessert: DessertModel): Promise<any> {
    const dessertCollection = instanceToPlain(dessert);

    return this.dessertCollection

      .updateOne({ uuid: dessertCollection.uuid }, { ...dessertCollection })
      .then();
  }
  static transformToModel(dessert: DessertDocument): DessertModel {
    const dessertPlain = dessert.toObject();

    delete dessertPlain._id;
    delete dessertPlain.__v;

    return plainToInstance(DessertModel, dessertPlain);
  }
  searchAll() {
    return this.dessertCollection
      .find()
      .limit(10)
      .exec()
      .then((documents) => documents.map(DessertRepository.transformToModel));
  }
}
