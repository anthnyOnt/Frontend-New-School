import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandler } from '@angular/common/http';

import { TokenInterceptor } from './token.interceptor';

describe('tokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    interceptor = new TokenInterceptor();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    expect(interceptor).toBeDefined();

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  });
})
