import { EntrepriseSchemaName, EntrepriseCollection } from '../schemas';

export default {
  schemaName: EntrepriseSchemaName,
  class: EntrepriseCollection,
  items: {
    entreprise_monoprix_tunis: {
      uuid: '42c7df44-4025-45ea-9ad9-f7ae73d42741',
      name: 'Monoprix',
      phone: '+21671142500',
      email: 'contact@monoprix.tn',
      activate: true,
      address: {
        street: '1 Rue des Minéraux',
        additional: 'La Charguia 1',
        city: 'Tunis',
        zipCode: '2035',
        country: 'Tunisie',
      },
      location: {
        coordinates: [36.83450889037029, 10.210558183287713],
      },
    },
    entreprise_zara_tunis: {
      uuid: 'b142e51e-8863-44a0-ac3a-86c3f5ba2bc1',
      name: 'Zara',
      phone: '+21670258200',
      email: 'contact@zara.com',
      activate: true,
      address: {
        street: '72 Rue des Minéraux',
        additional: 'La Charguia 1',
        city: 'Tunis',
        zipCode: '2035',
        country: 'Tunisie',
      },
      location: {
        coordinates: [36.83501978703411, 10.210235331491987],
      },
    },
    entreprise_orange_tunis: {
      uuid: 'af14c94d-4fe5-4929-869e-a1f2a5f3652d',
      name: 'Orange Tunisie',
      phone: '+21630013001',
      email: 'contact@orange.tn',
      activate: true,
      address: {
        street: 'Immeuble Orange Tunisie',
        city: 'Tunis',
        zipCode: '1003',
        country: 'Tunisie',
      },
      location: {
        coordinates: [36.84420956163735, 10.201003601641125],
      },
    },
    entreprise_valtech_it_ariana: {
      uuid: 'bf66ef43-fc7b-46ac-bf94-be8ff6203b8e',
      name: 'Valtech it',
      phone: '+21671766547',
      email: 'contact@valtech-it.com',
      activate: true,
      address: {
        street: 'Rue Ammar Ibn Yasser',
        additional: 'Bureau n°1',
        city: 'Ariana',
        zipCode: '2091',
        country: 'Tunisie',
      },
      location: {
        coordinates: [36.84846671780907, 10.165585190710788],
      },
    },
    entreprise_proxym_sousse: {
      uuid: '29c58a07-4f49-43ed-8927-99f4bd9d5f4e',
      name: 'Proxym',
      phone: '+21636015050',
      email: 'contact@proxym-group.com',
      activate: true,
      address: {
        street: 'Technopole de Sousse',
        additional: 'Novation City',
        zipCode: '4051',
        city: 'Sousse',
        country: 'Tunisie',
      },
      location: {
        coordinates: [35.81667797578777, 10.591269912497584],
      },
    },
    entreprise_whitecape_sousse: {
      uuid: '0231d729-4ef9-4abb-9225-7288c3324a75',
      name: 'Whitecape Technologies',
      phone: '+21636015050',
      email: 'contact@proxym-group.com',
      activate: true,
      address: {
        street: 'Avenue de la république',
        additional: 'Immeuble Mezri Jaaîm',
        zipCode: '4022',
        city: 'Akouda',
        country: 'Tunisie',
      },
      location: {
        coordinates: [35.86913333027373, 10.583760336529721],
      },
    },
    entreprise_teleperformance_sousse: {
      uuid: '7f755d9b-0539-4473-a9d2-88c1cf4445cc',
      name: 'Teleperformance',
      phone: '+21679100000',
      email: 'contact@teleperformance-tunisie.com',
      activate: true,
      address: {
        street: 'P1, Hammam Susah',
        zipCode: '4022',
        city: 'Akouda',
        country: 'Tunisie',
      },
      location: {
        coordinates: [35.880548765925944, 10.57782643891726],
      },
    },
  },
};
