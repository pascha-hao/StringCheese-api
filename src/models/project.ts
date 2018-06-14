import {Entity, property, model} from '@loopback/repository';
import { NOTINITIALIZED } from 'dns';

@model()
export class Project extends Entity {
  @property({
    type: 'number',
    id: true
  })
  project_id?: number;

  @property({
    type: 'string',
    required: true
  })
  title: string;

  @property({
    type: 'string',
    //required: true
  })
  description: string;

  @property({
    type: 'string',
    //required: true
  })
  projectimg: string;

  getId() {
    return this.id;
  }
}