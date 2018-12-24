import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';
import { WebconnectionService } from '../webconnection.service';
import { User } from '../user';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css'],
  providers: [
    WebconnectionService
  ]
})
export class DialogpageComponent implements OnInit, OnDestroy {

  currentInterlocutor: User = new User('Alex');
  dialogs: Dialog[] = [];
  isInDialog = false;

  messages: Observable<Message[]>;
  receivedMessage: Message;
  private _mesgSub: Subscription;

  newMsg: Message = new Message('Hello there');

  constructor( private router: Router,
    private webconService: WebconnectionService) {}

  ngOnInit() {
    // this.getDialogs();

  }

  getUsers() {
    this.webconService.getUsers()
      .subscribe(data => console.log(data));
  }

  getMessage() {

  }

  sendMessage(msg: string) {

    this.getUsers();
  }

  getDialogs() {
    // this.dialogs.push(new Dialog('Ann', 0));
    // this.messages.push(new Message('hey'));
    this.newMsg.id = 4;
    this.newMsg.senderId = 3;
    this.newMsg.subjectId = 2;

  }

  ngOnDestroy() {
    this._mesgSub.unsubscribe();
  }

}
