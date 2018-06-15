import {Entity, property, model} from '@loopback/repository';

@model()
export class Edit extends Entity {
  @property({
    type: 'string',
    required: true
  })
  firstname: string;

  @property({
    type: 'string',
    required: true
  })
  email: string;
}