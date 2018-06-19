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
  postimg: string;

  getId() {
    return this.id;
  }
}