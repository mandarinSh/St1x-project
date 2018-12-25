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
    this.webconService.getMessages({
      sender_id : this.currentUserId,
      subject_id : this.currentSubject.id
    })
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
    this.messages.push(new Message('hey'));
    // this.newMsg.id = 4;
    // this.newMsg.senderId = 3;
    // this.newMsg.subjectId = 2;

  }

  private updateConfiguration(data: any) {
    this.senderId 
  }

  ngOnDestroy() {
    this._mesgSub.unsubscribe();
  }

}
