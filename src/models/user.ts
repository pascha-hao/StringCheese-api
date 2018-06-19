import {Entity, property, model} from '@loopback/repository';
import { Donation } from './donation';

@model({
  name: "user"
})
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

  getId() {
    return this.id;
  }
}