import app from './app.config';
import modules from './modules';

export class ConfigLoader {
  static load() {
    return [app, ...modules];
  }
}
