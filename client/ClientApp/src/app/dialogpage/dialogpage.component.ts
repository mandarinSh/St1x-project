import { Component, OnInit } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';


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

  constructor() { }

  ngOnInit() {
    this.getDialogs();
  }

  getDialogs() {
    this.dialogs.push(new Dialog('Ann', 0));
    this.messages.push(new Message('hey'));
  }

}
