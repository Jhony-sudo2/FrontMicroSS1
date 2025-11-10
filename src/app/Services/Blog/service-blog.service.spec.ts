import { TestBed } from '@angular/core/testing';

import { ServiceBlogService } from './service-blog.service';

describe('ServiceBlogService', () => {
  let service: ServiceBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
