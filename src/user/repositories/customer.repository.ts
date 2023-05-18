import { Injectable } from '@nestjs/common';
import { CustomerModel } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import {
  CustomerCollection,
  CustomerDocument,
  CustomerSchemaName,
} from '../schemas';
import { Model } from 'mongoose';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PasswordHasher } from '../../common';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(CustomerSchemaName)
    private readonly customerCollection: Model<CustomerCollection>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  findOneByUuid(uuid: string): Promise<CustomerModel | null> {
    return this.customerCollection
      .findOne({ uuid })
      .exec()
      .then((document) => {
        if (!document) {
          return null;
        }

        return CustomerRepository.transformToModel(document);
      });
  }

  findOneByEmailOrPhone(emailOrPhone: string): Promise<CustomerModel | null> {
    return this.customerCollection
      .findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] })
      .exec()
      .then((document) => {
        if (!document) {
          return null;
        }

        return CustomerRepository.transformToModel(document);
      });
  }

  findOneByEmail(email: string): Promise<CustomerModel | null> {
    return this.customerCollection.findOne({ email }).then((document) => {
      if (!document) {
        return null;
      }

      return CustomerRepository.transformToModel(document);
    });
  }

  store(customer: CustomerModel): Promise<void> {
    return this.transformToDocument(customer)
      .then((document) => new this.customerCollection(document).save())
      .then();
  }

  delete(customer: CustomerModel): Promise<void> {
    return this.customerCollection.deleteOne({ uuid: customer.uuid }).then();
  }

  async update(customer: CustomerModel): Promise<void> {
    return this.transformToDocument(customer)
      .then((customerDocument) => {
        return this.customerCollection.findOneAndUpdate(
          { uuid: customerDocument.uuid },
          customerDocument,
        );
      })
      .then();
  }

  transformToDocument(customer: CustomerModel): Promise<CustomerCollection> {
    return Promise.all([customer.hashPassword(this.passwordHasher)]).then(
      () => instanceToPlain(customer) as CustomerCollection,
    );
  }

  static transformToModel(customer: CustomerDocument): CustomerModel {
    const customerPlain = customer.toObject();

    delete customerPlain._id;
    delete customerPlain.__v;

    return plainToInstance(CustomerModel, customerPlain);
  }

  searchAll() {
    return this.customerCollection
      .find()
      .limit(10)
      .exec()
      .then((documents) => documents.map(CustomerRepository.transformToModel));
  }
}
