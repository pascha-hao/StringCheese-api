import {Entity, property, model} from '@loopback/repository';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  role: string;

  getId() {
    return this.id;
  }
}