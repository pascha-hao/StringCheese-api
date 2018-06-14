import {Entity, property, model} from '@loopback/repository';

@model()
export class Address extends Entity {
  @property({
    type: 'number',
    id: true
  })
  address_id?: number;

  @property({
    type: 'string',
    required: true
  })
  addressline: string;

  @property({
    type: 'string',
    //required: true
  })
  country: string;

  @property({
    type: 'string',
    //required: true
  })
  state: string;

  @property({
    type: 'string',
    //required: true
  })
  zipcode: string;

  getId() {
    return this.id;
  }
}