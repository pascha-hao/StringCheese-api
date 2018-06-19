import {Entity, property, model} from '@loopback/repository';

@model({
    name: "edit"
  })
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