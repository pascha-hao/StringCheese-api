import {Entity, property, model} from '@loopback/repository';

@model({
  name: "post"
})
export class Post extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  charity_id: number;

  @property({
    type: 'string',
    //required: true
  })
  user_id: number;

  getId() {
    return this.id;
  }
}