import {Entity, property, model} from '@loopback/repository';

@model({
  name: "unfav"
}) 
export class Unfav extends Entity {
 
  @property({
    type: 'number',
    required: true
  })
  user_id: number;

  @property({
    type: 'number',
    required: true
  })
  charity_id: number;

  
}