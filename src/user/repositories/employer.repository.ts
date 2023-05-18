import { InjectModel } from '@nestjs/mongoose';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { PasswordHasher } from '../../common';
import {
  EmployerCollection,
  EmployerDocument,
  EmployerSchemaName,
} from '../schemas/employer.schema';
import { Model } from 'mongoose';
import { EmployerModel } from '../models';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class EmployerRepository {
  constructor(
    @InjectModel(EmployerSchemaName)
    private readonly employerCollection: Model<EmployerCollection>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  store(customer: EmployerModel): Promise<void> {
    return this.transformToDocument(customer)
      .then((document) => new this.employerCollection(document).save())
      .then();
  }

  transformToDocument(customer: EmployerModel): Promise<EmployerCollection> {
    return Promise.all([customer.hashPassword(this.passwordHasher)]).then(
      () => instanceToPlain(customer) as EmployerCollection,
    );
  }

  findOneByEmail(email: string): Promise<EmployerModel | null> {
    return this.employerCollection.findOne({ email }).then((document) => {
      if (!document) {
        return null;
      }

      return EmployerRepository.transformToModel(document);
    });
  }

  static transformToModel(employer: EmployerDocument): EmployerModel {
    const employerPlain = employer.toObject();

    delete employerPlain._id;
    delete employerPlain.__v;

    return plainToInstance(EmployerModel, employerPlain);
  }

  findOneByUuid(uuid: string): Promise<EmployerModel | null> {
    return this.employerCollection.findOne({ uuid }).then((document) => {
      if (!document) {
        return null;
      }

      return EmployerRepository.transformToModel(document);
    });
  }
}
