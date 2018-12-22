import { Injectable, Component } from '@angular/core';
import { Message } from './message';
import { Dialog } from './dialog';
import { Subject } from 'rxjs';
import { Observable, of, observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WebconnectionService } from './webconnection.service';
import 'rxjs/add/operator/map';


const CHAT_URL = 'ws://echo.websocket.org/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;

  constructor(wcService: WebconnectionService) {
    this.messages =  <Subject<Message>>wcService
    .connect(CHAT_URL)
    .map((response: MessageEvent): Message => {
      let data = JSON.parse(response.data);
      return {
        id: data.id,
        subjectId: data.subjectId,
        text: data.message_body,
        senderId: data.senderId
      };
    });
  }


  send(message: string) {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Returned code ${error.status}, ` +
        `body: ${error.error}`);
    }
    alert('Something went wrong!');
    return throwError('Something went wrong.');
  }

}

