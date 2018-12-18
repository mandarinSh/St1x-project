import { Component, OnInit } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';
import { ChatService } from '../chat.service';
import { WebconnectionService } from '../webconnection.service';
import { User } from '../user';


@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css'],
  providers: [ WebconnectionService, ChatService ]
})
export class DialogpageComponent implements OnInit {

  currentInterlocutor: User = new User('Alex');
  dialogs: Dialog[] = [];
  messages: Message[] = [];
  isInDialog = false;

  newMsg: Message = new Message('Hello there');

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      console.log('Response from web: ' + msg);
    });
  }

  ngOnInit() {
    this.getDialogs();
  }

  getDialogs() {
    // this.dialogs.push(new Dialog('Ann', 0));
    // this.messages.push(new Message('hey'));
    this.newMsg.id = 4;
    this.newMsg.senderId = 3;
    this.newMsg.subjectId = 2;

  }

  sendMessage(newMsg: Message) {
    console.log('Message to send: ' + this.newMsg);
    this.chatService.messages.next(newMsg);
    this.newMsg.text = '';
  }

}
