import { PasswordHasher } from '../../../../src/common';

describe('[common] password hasher', () => {
  it('hash', () => {
    return new PasswordHasher()
      .hash('123456', '222fb4dd-004a-4176-8df1-0178422c1eeb')
      .then((hashedPassword) => {
        expect(hashedPassword).toEqual(
          '$argon2i$v=19$m=2730,t=3,p=10$MjIyZmI0ZGQtMDA0YS00MTc2LThkZjEtMDE3ODQyMmMxZWVi$FkZahQJlAsr/ZJkTDDjB46WkwwKVUfVdc1cazTSvN5A',
        );
      });
  });

  it('need hash plain password', () => {
    expect(
      new PasswordHasher().needHash('222fb4dd-004a-4176-8df1-0178422c1eeb'),
    ).toEqual(true);
  });

  it('need hash hashed password', () => {
    expect(
      new PasswordHasher().needHash(
        '$argon2i$v=19$m=2730,t=3,p=10$MjIyZmI0ZGQtMDA0YS00MTc2LThkZjEtMDE3ODQyMmMxZWVi$FkZahQJlAsr/ZJkTDDjB46WkwwKVUfVdc1cazTSvN5A',
      ),
    ).toEqual(false);
  });
});
