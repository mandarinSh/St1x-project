import { Component, OnInit } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css']
})
export class DialogpageComponent implements OnInit {

  currentInterlocutor = null;
  dialogs: Dialog[] = [];
  messages: Message[] = [];
  isInDialog = false;

  newMsg = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getDialogs();
  }

  getDialogs() {
    this.dialogs.push(new Dialog('Ann', 0));
    this.messages.push(new Message('hey'));
  }

  sendMessage(newMsg: string) {
    this.chatService.send(newMsg);
  }

}
