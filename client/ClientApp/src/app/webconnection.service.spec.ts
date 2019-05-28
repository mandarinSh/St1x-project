import {WebconnectionService} from './webconnection.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('WebconnectionService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebconnectionService],
      imports: [HttpClientTestingModule]
    });
  });

  describe(':', () => {

    function setup() {
      const webService = TestBed.get(WebconnectionService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { webService, httpTestingController };
    }

    it('should get user', () => {
      const { webService } = setup();
      const someUser = {
        'id': 1,
        'nickname': 'mandarin'
      };
      webService.getUser(1)
        .subscribe(data => expect(data).toBe(someUser));
    });

    it('should getDialogs', () => {
      const { webService } = setup();
      const someLastMessages = [{
        'id': 3,
        'message_body': 'fine thanks',
        'dialogue_id': 1,
        'sender_id': 1,
        'receiver_id': 1
      }];
      webService.getDialogs('3')
        .subscribe(data => expect(data).toBe(someLastMessages));
    });

    it('should getMessages', () => {
      const {webService, httpTestingController } = setup();
      const someLastMessages = [{
        'id': 1,
        'message_body': 'hey there',
        'dialogue_id': 1,
        'sender_id': 2,
        'receiver_id': 1
      },
        {
          'id': 2,
          'message_body': 'how are you?',
          'dialogue_id': 1,
          'sender_id': 2,
          'receiver_id': 1
        },
        {
          'id': 3,
          'message_body': 'fine thanks',
          'dialogue_id': 1,
          'sender_id': 1,
          'receiver_id': 1
        }];
      webService.getMessages(1)
        .subscribe(data => expect(data).toBe(someLastMessages));
    });

    it('should findUser', () => {
      const {webService, httpTestingController } = setup();
      const someUser = {
        'id': 1,
        'nickname': 'mandarin'
      };
      webService.findUser('1')
        .subscribe(data => expect(data).toBe(someUser));
    });

    it('should register', () => {
      const {webService, httpTestingController } = setup();
      const registerObj = {
        'nickname': 'man2',
        'password': '111111'
      };
      const response = {
        'ok': 'signed_up',
        'user': {
          'id': 3,
          'nickname': 'man2'
        }};
      webService.register(registerObj)
        .subscribe(data => expect(data).toBe(response));
    });

    it('should signIn', () => {
      const {webService, httpTestingController } = setup();
      const signInObj = {
        'nickname': 'man2',
        'password': '111111'
      };
      const response = {
        'ok': 'signed_in',
        'user': {
          'id': 3,
          'nickname': 'man2'
        }};
      webService.signIn(signInObj)
        .subscribe(data => expect(data).toBe(response));
    });

    it('should sendMessage', () => {
      const {webService, httpTestingController } = setup();
      const msg = {
        'sender_id': '2',
        'receiver_id': '1',
        'message_body': 'test msg',
        'dialogue_id' : '1'
      };
      const status = 200;
      webService.sendMessage(msg)
        .subscribe(data => expect(data.status).toBe(status));
    });

  });
});



// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import { FormsModule} from '@angular/forms';
//
// import { WebconnectionService } from './webconnection.service';
//
// ///
// import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs';
// import { HttpHeaders, HttpClient, HttpErrorResponse, ɵHttpInterceptingHandler,
//   HttpHandler, HttpParams } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import {LoginpageComponent} from './loginpage/loginpage.component';
// import {RegisterpageComponent} from './registerpage/registerpage.component';
// import {DialogpageComponent} from './dialogpage/dialogpage.component';
// import {WebconnectionMockService} from './webconnection-mock.service';
// ///
//
// describe('WebconnectionService', () => {
//   // let lpComp: LoginpageComponent;
//   // let rpComp: RegisterpageComponent;
//   // let dpComp: DialogpageComponent;
//   // let lpFixture: ComponentFixture<LoginpageComponent>;
//   // let rpFixture: ComponentFixture<RegisterpageComponent>;
//   // let dpFixture: ComponentFixture<DialogpageComponent>;
//
//   let service: WebconnectionService;
//
//   beforeEach(async() =>
//     TestBed.configureTestingModule({
//       declarations: [
//         LoginpageComponent,
//         RegisterpageComponent,
//         DialogpageComponent
//       ],
//       providers: [
//         // {provide: WebconnectionService}
//         { provide: WebconnectionService, useClass: WebconnectionMockService }
//       ]
//     }).compileComponents().then(() => {
//       // lpFixture = TestBed.createComponent(LoginpageComponent);
//       // rpFixture = TestBed.createComponent(RegisterpageComponent);
//       // dpFixture = TestBed.createComponent(DialogpageComponent);
//       // lpComp = lpFixture.componentInstance;
//       // rpComp = rpFixture.componentInstance;
//       // dpComp = dpFixture.componentInstance;
//     }));
//
//   it('should be created', () => {
//     const service: WebconnectionService = TestBed.get(WebconnectionService);
//     expect(service).toBeTruthy();
//   });
//
//   // afterAll(() => {
//   //   TestBed.resetTestingModule();
//   // });
// });
