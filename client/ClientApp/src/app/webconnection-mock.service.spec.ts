import { TestBed } from '@angular/core/testing';

import { WebconnectionMockService } from './webconnection-mock.service';

///
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse, ɵHttpInterceptingHandler,
  HttpHandler, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
///

describe('WebconnectionMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebconnectionMockService = TestBed.get(WebconnectionMockService);
    expect(service).toBeTruthy();
  });
});
