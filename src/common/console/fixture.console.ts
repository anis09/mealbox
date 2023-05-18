import { Command, Console } from 'nestjs-console';
import { Connection, Model } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import catalogFixturesFiles from '../../catalog/fixtures';
import userFixturesFiles from '../../user/fixtures';
import entrepriseFixturesFiles from '../../entreprise/fixtures';
import { ModulesContainer } from '@nestjs/core';
import * as ora from 'ora';

@Console({
  command: 'fixture',
  description: 'fixture commands',
  alias: 'f',
})
export class FixtureConsole {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly modulesContainer: ModulesContainer,
  ) {}

  @Command({
    command: 'load',
    description: 'load fixtures',
  })
  async loadFixtures(): Promise<void> {
    const databaseSpinner = ora({
      discardStdin: false,
      spinner: 'dots',
    });

    databaseSpinner.start('Purging database');

    await this.connection.db.dropDatabase();

    databaseSpinner.succeed('Purged database');

    const bulks: Promise<any>[] = [];

    for (const fixturesFile of [
      ...catalogFixturesFiles,
      ...userFixturesFiles,
      ...entrepriseFixturesFiles,
    ]) {
      const fixtureSpinner = ora({
        discardStdin: false,
        spinner: 'dots',
      });

      fixtureSpinner.start(
        `Loading ${fixturesFile.schemaName.replace('.', ' ')}`,
      );

      const model = this.connection.model<Model<typeof fixturesFile.class>>(
        fixturesFile.schemaName,
      );

      let fixtures = Object.values(fixturesFile.items);

      if (fixturesFile['beforeLoad']) {
        fixtures = await Promise.all(
          fixtures.map(async (fixture) => {
            const instances = fixturesFile['beforeLoad'][1].map((token) => {
              let tokenInstance = null;

              for (const module of [...this.modulesContainer.values()]) {
                if (module.hasProvider(token)) {
                  tokenInstance = module.getProviderByKey(token).instance;
                }
              }

              return tokenInstance;
            });

            return await fixturesFile['beforeLoad'][0](fixture, ...instances);
          }),
        );
      }

      const models = fixtures.map((fixture) => {
        return new model(fixture);
      });

      bulks.push(
        model.bulkSave(models).then((response) => {
          fixtureSpinner.succeed(
            `${
              response.result.nInserted
            } loaded ${fixturesFile.schemaName.replace('.', ' ')}`,
          );

          if (fixturesFile['afterLoad']) {
            return Promise.all(
              fixtures.map(async (fixture) => {
                const instances = fixturesFile['afterLoad'][1].map((token) => {
                  let tokenInstance = null;

                  for (const module of [...this.modulesContainer.values()]) {
                    if (module.hasProvider(token)) {
                      tokenInstance = module.getProviderByKey(token).instance;
                    }
                  }

                  return tokenInstance;
                });

                return await fixturesFile['afterLoad'][0](
                  fixture,
                  ...instances,
                );
              }),
            );
          }
        }),
      );

      await Promise.all(bulks);
    }
  }
}
