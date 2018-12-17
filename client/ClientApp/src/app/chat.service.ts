import { Injectable } from '@angular/core';
import { Message } from './message';
import { Dialog } from './dialog';
import { Subject } from 'rxjs';


const CHAT_URL = 'localhost:9999';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;

  constructor() { }

  send(message: string) {

  }

}
