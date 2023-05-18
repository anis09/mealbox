import { AppModule } from './app.module';
import { BootstrapConsole } from 'nestjs-console';

async function bootstrap() {
  const bootstrapConsole = new BootstrapConsole({
    module: AppModule,
    useDecorators: true,
    contextOptions: {
      logger: false,
    },
  });

  bootstrapConsole.init().then(async (app) => {
    try {
      await app.init();
      await bootstrapConsole.boot();
      await app.close();
    } catch (e) {
      console.error(e);
      await app.close();
      process.exit(1);
    }
  });
}
bootstrap();
