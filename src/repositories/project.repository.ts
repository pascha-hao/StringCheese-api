import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Project } from '../models/project';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Project, datasource);
  }
}