import {StringCheeseApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {StringCheeseApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new StringCheeseApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
