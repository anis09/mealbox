import { Injectable } from '@nestjs/common';
import { EntrepriseAddRequestModel } from '../models/index';
import { InjectModel } from '@nestjs/mongoose';
import {
  EntrepriseRequestCollection,
  EntrepriseRequestDocument,
  EntrepriseRequestSchemaName,
} from '../schemas';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class EntrepriseRequestRepository {
  constructor(
    @InjectModel(EntrepriseRequestSchemaName)
    private readonly entrepriseRequestCollection: Model<EntrepriseRequestCollection>,
  ) {}

  private static transformToDocument(
    model: EntrepriseAddRequestModel,
  ): EntrepriseRequestCollection {
    const entreprisePlain = instanceToPlain(model);

    delete entreprisePlain.__v;
    delete entreprisePlain._id;

    return {
      ...entreprisePlain,
    } as EntrepriseRequestCollection;
  }
  transformToModel(
    document: EntrepriseRequestDocument,
  ): EntrepriseAddRequestModel {
    const plainDocument = document.toObject();

    const plainModel = {
      ...plainDocument,
      location: {
        zipCode: plainDocument.address[0],
        street: plainDocument.address[1],
      },
    };

    delete plainModel.__v;
    delete plainModel._id;

    return plainToInstance(EntrepriseAddRequestModel, plainModel);
  }

  store(entrepriseRequest: EntrepriseAddRequestModel): Promise<void> {
    return new this.entrepriseRequestCollection(
      EntrepriseRequestRepository.transformToDocument(entrepriseRequest),
    )
      .save()
      .then();
  }
  searchAll() {
    return this.entrepriseRequestCollection
      .find()
      .limit(10)
      .exec()
      .then((documents) => documents.map(this.transformToModel));
  }
}
