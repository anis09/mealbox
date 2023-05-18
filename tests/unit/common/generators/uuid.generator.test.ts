import { v4 as uuid } from 'uuid';
import { UuidGenerator } from '../../../../src/common';

jest.mock('uuid');

describe('[common] uuid generator', () => {
  it('generate', () => {
    const uuidExcept = '2bada267-5d6d-4179-a9ab-58099e359d16';

    uuid.mockImplementationOnce(() => {
      return uuidExcept;
    });

    const uuidGenerator = new UuidGenerator();

    expect(uuidGenerator.generate()).toEqual(uuidExcept);
  });
});
