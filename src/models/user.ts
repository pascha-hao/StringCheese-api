import {Entity, property, model} from '@loopback/repository';
import { MyCharity } from './myCharity';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  firstname: string;

  @property({
    type: 'string',
    required: true
  })
  lastname: string;

  @property({
    type: 'string',
    required: true
  })
  email: string;

  @property({
    type: 'string',
    required: true
  })
  password: string;

  @property({
    type: 'string',
    required: true
  })
  ccnum: string;

  @property({
    type: 'string',
    required: true
  })
  exp: string;

  @property({
    type: 'string',
    required: true
  })
  cvc: string;

  getId() {
    return this.id;
  }
}