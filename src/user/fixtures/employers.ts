import { PasswordHasher } from '../../common';
import {
  CustomerCollection,
  EmployerCollection,
  EmployerSchemaName,
} from '../schemas';

export default {
  schemaName: EmployerSchemaName,
  class: EmployerCollection,
  items: {
    employer_claude: {
      uuid: 'eb1cae1e-9b47-45fc-b009-f72aa51d77a6',
      firstName: 'claude',
      lastName: 'khedhiri',
      email: 'claude@prima-it.consulting',
      password: 'admin',
    },
    employer_houssem: {
      uuid: '870dbd79-0d4e-40f7-b12a-5cf086f18c37',
      firstName: 'houssem',
      lastName: 'rouis',
      email: 'houssem@prima-it.consulting',
      password: 'admin',
    },
    employer_anis: {
      uuid: 'a763f868-0afb-4de3-8fcc-91ea8ea57144',
      firstName: 'Anis',
      lastName: 'ZAATOUR',
      email: 'anis@prima-it.consulting',
      password: 'admin',
    },
    employer_donia: {
      uuid: '3b8e23c7-9901-45f4-bd6c-f051b410628d',
      firstName: 'donia',
      lastName: 'jarrar',
      email: 'donia@prima-it.consulting',
      password: 'admin',
    },
    employer_fedi: {
      uuid: '5744fa94-6e53-477e-a2fd-53fccb195e0a',
      firstName: 'Fedi',
      lastName: 'bouzayen',
      email: 'fedi@prima-it.consulting',
      password: 'admin',
    },
    employer_jihed: {
      uuid: '2d60c343-67df-47da-99e1-0cd6dbbac20b',
      firstName: 'jihed',
      lastName: 'mrouki',
      email: 'jihed@prima-it.consulting',
      password: 'admin',
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
