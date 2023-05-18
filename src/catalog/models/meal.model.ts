export interface MealAddInput {
  name: string;

  description: string;

  price: number;

  category: string;

  image: string;
}

export interface MealUpdateInput {
  name?: string;

  description?: string;

  price?: number;

  category?: string;

  image?: string;
}

export class MealModel {
  private name: string;

  private description: string;

  private price: number;

  private category: string;

  private image: string;

  private updatedAt: Date;

  constructor(public readonly uuid: string) {}

  add(input: MealAddInput) {
    this.name = input.name;

    this.description = input.description;

    this.price = input.price;

    this.category = input.category;

    this.image = input.image;

    return this;
  }

  update(input: MealUpdateInput) {
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
