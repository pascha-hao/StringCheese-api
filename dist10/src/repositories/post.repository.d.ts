import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Post } from '../models/post';
export declare class PostRepository extends DefaultCrudRepository<Post, typeof Post.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
