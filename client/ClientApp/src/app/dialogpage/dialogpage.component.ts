import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';
import { WebconnectionService } from '../webconnection.service';
import { User } from '../user';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css'],
  providers: [
    WebconnectionService
  ]
})
export class DialogpageComponent implements OnInit, OnDestroy {

  currentSubject: User = new User('Alex');
  currentUserId: number;

  dialogs: Dialog[] = [];
  isInDialog = false;

  // messages: Observable<Message[]>;
  messages: Message[] = [];
  receivedMessage: Message;
  private _mesgSub: Subscription;

  // newMsg: Message = new Message('Hello there');
  newMsg = '';

  constructor( private router: Router,
    private webconService: WebconnectionService) {}

  ngOnInit() {
    this.getDialogs();
    this.currentUserId = this.webconService.currentUserId;
  }

  getUsers() {
    this.webconService.getUsers()
      .subscribe(data => console.log(data));
  }

  getMessages() {
    this.isInDialog = true;
    this.webconService.getMessages({
      sender_id : this.currentUserId,
      subject_id : this.currentSubject.id
    }).takeWhile(this.isInDialog)
      .subscribe(data => this.updateConfiguration(data));
  }

  sendMessage() {
    this.messages.push(new Message(this.newMsg));
    this.webconService.sendMessage(
      {'sender_id' : this.currentUserId,
        'subjectId' : this.currentSubject.id,
        'message_body' : this.newMsg,
        'inserted_at' : ''
      });
    // this.getUsers();
  }

  getDialogs() {
    // this.dialogs.push(new Dialog('Ann', 0));
    // this.messages.push(new Message('hey'));
    this.webconService.getDialogs()
      .subscribe(data => console.log(data));

  }

  private updateConfiguration(data: any) {
    // TODO: add this values to messages array

    data.forEach(element => {
      const senderId = element.sender_id;
      const subjectId = element.subject_id;
      const messageBody = element.message_body;

      const message: Message = new Message(messageBody);
      message.senderId = senderId;
      message.subjectId = subjectId;
      this.messages.push(message);
    });

  }

  ngOnDestroy() {
    this._mesgSub.unsubscribe();
    this.messages = [];
    this.dialogs = [];
  }

}
