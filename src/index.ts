import {GoldenThreadApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {GoldenThreadApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new GoldenThreadApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
