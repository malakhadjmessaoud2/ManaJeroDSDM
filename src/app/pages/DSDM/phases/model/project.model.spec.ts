// project.model.spec.ts

import { Project } from './project.model';

describe('Project', () => {
  it('should create a project object', () => {
    const project: Project = {
      id: '1',
      title: 'Test Project',
      status:'en cour'
    };

    expect(project.id).toEqual('1');
    expect(project.title).toEqual('Test Project');
  });
});
