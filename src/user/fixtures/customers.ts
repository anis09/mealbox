import { CustomerSchemaName, CustomerCollection } from '../schemas';
import { PasswordHasher } from '../../common';

export default {
  schemaName: CustomerSchemaName,
  class: CustomerCollection,
  items: {
    customer_21620000000: {
      uuid: '870dbd79-0d4e-40f7-b12a-5cf086f18c37',
      firstName: 'ceif',
      lastName: 'khedhiri',
      email: 'ceif@khedhiri.com',
      phone: '+21620000000',
      password: 'customer',
      entreprise: 'fe5z7f4ez854fdez75f5z',
    },
    customer_21621000000: {
      uuid: 'b64ff35f-e199-4980-bc88-20d145513220',
      firstName: 'jihed',
      lastName: 'mrouki',
      email: 'jihed@mrouki.com',
      phone: '+21621000000',
      password: 'customer',
      entreprise: 'fe5z7f4ez854fdez75f5z',
    },
    customer_54093581: {
      uuid: '870dbd79-e199-0d4e-b12a-20d145513220',
      firstName: 'Houssem',
      lastName: 'ROUIS',
      email: 'houssem@prima-it.consulting',
      phone: '+21654093581',
      password: 'customer',
      entreprise: 'fe5z7f4ez854fdez75f5z',
    },
  },
  beforeLoad: [
    async (customer: CustomerCollection, passwordHasher: PasswordHasher) => {
      customer.password = await passwordHasher.hash(
        customer.password,
        customer.uuid,
      );

      return customer;
    },
    [PasswordHasher],
  ],
};
