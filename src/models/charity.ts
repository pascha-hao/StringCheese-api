import {Entity, property, model} from '@loopback/repository';

@model()
export class Charity extends Entity {
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
    type: 'string',
    //required: true
  })
  description: string;

  @property({
    type: 'string',
    //required: true
  })
  charitycardimg: string;

  @property({
    type: 'string',
    //required: true
  })
  website: string;

  @property({
    type: 'string',
    //required: true
  })
  logo: string;

  getId() {
    return this.id;
  }
}