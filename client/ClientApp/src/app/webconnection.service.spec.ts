import {ComponentFixture, TestBed} from '@angular/core/testing';
import { FormsModule} from '@angular/forms';

import { WebconnectionService } from './webconnection.service';

///
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse, ɵHttpInterceptingHandler,
  HttpHandler, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {RegisterpageComponent} from './registerpage/registerpage.component';
import {DialogpageComponent} from './dialogpage/dialogpage.component';
import {WebconnectionMockService} from './webconnection-mock.service';
///

describe('WebconnectionService', () => {
  let lpComp: LoginpageComponent;
  let rpComp: RegisterpageComponent;
  let dpComp: DialogpageComponent;
  let lpFixture: ComponentFixture<LoginpageComponent>;
  let rpFixture: ComponentFixture<RegisterpageComponent>;
  let dpFixture: ComponentFixture<DialogpageComponent>;

  beforeEach(async() =>
    TestBed.configureTestingModule({
      declarations: [
        LoginpageComponent,
        RegisterpageComponent,
        DialogpageComponent
      ],
      providers: [
        { provide: WebconnectionService, useClass: WebconnectionMockService }
      ]
    }).compileComponents().then(() => {
      lpFixture = TestBed.createComponent(LoginpageComponent);
      rpFixture = TestBed.createComponent(RegisterpageComponent);
      dpFixture = TestBed.createComponent(DialogpageComponent);
      lpComp = lpFixture.componentInstance;
      rpComp = rpFixture.componentInstance;
      dpComp = dpFixture.componentInstance;
    }));

  it('should be created', () => {
    const service: WebconnectionService = TestBed.get(WebconnectionService);
    expect(service).toBeTruthy();
  });
});
