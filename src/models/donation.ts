import {Entity, property, model} from '@loopback/repository';

@model()
export class Donation extends Entity {
  @property({
    type: 'number',
    id: true
  })
  donation_id?: number;

  @property({
    type: 'string',
    required: true
  })
  charity_id: number;

  @property({
    type: 'string',
    //required: true
  })
  amount: number;

  getId() {
    return this.id;
  }
}