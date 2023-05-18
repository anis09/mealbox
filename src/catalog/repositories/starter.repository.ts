import { Injectable } from '@nestjs/common';
import { StarterModel } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import {
  StarterCollection,
  StarterDocument,
  StarterSchemaName,
} from '../schemas';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class StarterRepository {
  constructor(
    @InjectModel(StarterSchemaName)
    private readonly starterCollection: Model<StarterCollection>,
  ) {}

  store(starter: StarterModel): Promise<void> {
    return this.transformToDocument(starter).save().then();
  }

  bulkStore(starters: StarterModel[]) {
    return this.starterCollection.bulkSave(
      starters.map(this.transformToDocument),
    );
  }

  transformToDocument(starter: StarterModel): StarterDocument {
    return new this.starterCollection(instanceToPlain(starter));
  }

  transformToModel(starter: StarterDocument): StarterModel {
    return plainToInstance(StarterModel, starter.toObject());
  }

  count() {
    return this.starterCollection.count().exec();
  }
  delete(starter: StarterModel): Promise<void> {
    return this.starterCollection.deleteOne({ uuid: starter.uuid }).then();
  }

  update(starter: StarterModel): Promise<any> {
    const starterCollection = instanceToPlain(starter);

    return this.starterCollection

      .updateOne({ uuid: starterCollection.uuid }, { ...starterCollection })
      .then();
  }
  static transformToModel(starter: StarterDocument): StarterModel {
    const starterPlain = starter.toObject();

    delete starterPlain._id;
    delete starterPlain.__v;

    return plainToInstance(StarterModel, starterPlain);
  }

  findOneByUuid(uuid: string): Promise<StarterModel | null> {
    return this.starterCollection.findOne({ uuid }).then((result) => {
      if (!result) {
        return null;
      }

      const plain = result.toObject();
      delete plain._id;

      return plainToInstance(StarterModel, plain);
    });
  }
  searchAll() {
    return this.starterCollection
      .find()
      .limit(10)
      .exec()
      .then((documents) => documents.map(StarterRepository.transformToModel));
  }
}
