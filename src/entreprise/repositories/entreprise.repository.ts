import { Injectable } from '@nestjs/common';
import { EntrepriseModel } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import {
  EntrepriseCollection,
  EntrepriseDocument,
  EntrepriseSchemaName,
} from '../schemas';
import { FilterQuery, Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class EntrepriseRepository {
  constructor(
    @InjectModel(EntrepriseSchemaName)
    private readonly entrepriseCollection: Model<EntrepriseCollection>,
  ) {}

  private static transformToDocument(
    model: EntrepriseModel,
  ): EntrepriseCollection {
    const entreprisePlain = instanceToPlain(model);
    return {
      ...entreprisePlain,
      location: {
        coordinates: [
          entreprisePlain.location.latitude,
          entreprisePlain.location.longitude,
        ],
      },
    } as EntrepriseCollection;
  }

  store(entreprise: EntrepriseModel): Promise<void> {
    return new this.entrepriseCollection(
      EntrepriseRepository.transformToDocument(entreprise),
    )
      .save()
      .then();
  }

  update(entreprise: EntrepriseModel): Promise<void> {
    const entrepriseCollection =
      EntrepriseRepository.transformToDocument(entreprise);

    return this.entrepriseCollection
      .updateOne({ uuid: entrepriseCollection.uuid }, entrepriseCollection)

      .then();
  }

  findOneByUuid(uuid: string): Promise<EntrepriseModel | null> {
    return this.entrepriseCollection.findOne({ uuid }).then((document) => {
      if (!document) {
        return null;
      }

      return this.transformToModel(document);
    });
  }
  delete(entreprise: EntrepriseModel): Promise<void> {
    return this.entrepriseCollection
      .deleteOne({ uuid: entreprise.uuid })
      .then();
  }

  transformToModel(document: EntrepriseDocument): EntrepriseModel {
    const plainDocument = document.toObject();

    const plainModel = {
      ...plainDocument,
      location: {
        latitude: plainDocument.location.coordinates[0],
        longitude: plainDocument.location.coordinates[1],
      },
    };

    delete plainModel.__v;
    delete plainModel._id;

    return plainToInstance(EntrepriseModel, plainModel);
  }

  searchByNameAndLocation(
    name?: string,
    location?: { longitude: number; latitude: number },
    distance?: number,
  ) {
    const filter: FilterQuery<EntrepriseCollection> = {
      $and: [
        {
          activate: true,
        },
      ],
    };

    if (name) {
      filter.$and.push({
        $text: {
          $search: name,
          $diacriticSensitive: true,
        },
      });
    }

    if (location) {
      filter.$and.push({
        location: {
          $geoWithin: {
            $centerSphere: [
              [location.latitude, location.longitude],
              distance ?? 10 / 6371,
            ],
          },
        },
      });
    }

    return this.entrepriseCollection
      .find(filter)
      .limit(10)
      .exec()
      .then((documents) => {
        return documents.map(this.transformToModel);
      });
  }
}
