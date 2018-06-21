import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Post } from '../models/post';

export class PostRepository extends DefaultCrudRepository<
  Post,
  typeof Post.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Post, datasource);
  }
}