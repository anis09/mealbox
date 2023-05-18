import { DessertUpdateInput } from '../graphql';

export interface DessertAddInput {
  name: string;

  description: string;

  price: number;

  category: string;

  image: string;
}

export class DessertModel {
  private name: string;

  private description: string;

  private price: number;

  private image: string;

  private category: string;

  private updatedAt: Date;

  constructor(public readonly uuid: string) {}

  add(input: DessertAddInput) {
    this.name = input.name;

    this.description = input.description;

    this.price = input.price;

    this.category = input.category;

    this.image = input.image;

    return this;
  }
  update(input: DessertUpdateInput) {
    let hasChanges = false;

    if (input.hasOwnProperty('name') && this.name !== input.name) {
      this.name = input.name;
      hasChanges = true;
    }

    if (
      input.hasOwnProperty('description') &&
      this.description !== input.description
    ) {
      this.description = input.description;
      hasChanges = true;
    }

    if (input.hasOwnProperty('price') && this.price !== input.price) {
      this.price = input.price;
      hasChanges = true;
    }

    if (input.hasOwnProperty('category') && this.category !== input.category) {
      this.category = input.category;
      hasChanges = true;
    }

    if (input.hasOwnProperty('image') && this.image !== input.image) {
      this.image = input.image;
      hasChanges = true;
    }

    if (hasChanges) {
      this.updatedAt = new Date();
    }

    return this;
  }
}
