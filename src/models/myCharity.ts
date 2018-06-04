import {Entity, property, model} from '@loopback/repository';

@model()
export class MyCharity extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'number',
    required: true
  })
  percent: number;

  @property({
    type: 'number',
    required: true
  })
  userID: number;
}