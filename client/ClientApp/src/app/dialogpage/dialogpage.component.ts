import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';
import { WebconnectionService } from '../webconnection.service';
import { User } from '../user';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, takeWhile, findIndex } from 'rxjs/operators';
import { interval } from 'rxjs';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css'],
})
export class DialogpageComponent implements OnInit, OnDestroy {

  currentUser: User = null;
  currentUserId: number = null;
  currentReceiverId: number = null;
  currentDialogueId: number = null;
  currentReceiverNickname = '';
  nicknameUserToFind = '';

  dialogs: Dialog[] = [];
  messages: Message[] = [];
  newMsg = '';

  receivedMessage: Message;
  private _mesgSub: Subscription;
  isInDialog = false;
  id: number;

  constructor(private router: Router,
    private webconService: WebconnectionService) {

    this.currentUserId = webconService.currentUserId;
    console.log('currentUserId = ' + this.webconService.currentUserId);
  }

  ngOnInit() {
    if (this.currentUserId === null) {
      this.router.navigate(['/loginpage']);
      console.log('Error! you are not logged in.');
    }
    this.id = window.setInterval(() => {
      this.getMessages();
      this.getDialogs();
      console.log('get mesg and dialogs');
    }, 10000);
    this.getDialogs();
  }

  getUsers() {
    this.webconService.getUsers()
      .subscribe(data => console.log(data));
  }

  onDialogClick(clickedId: number) {
    this.isInDialog = true;
    this.currentReceiverId = this.dialogs.find(({ id }) => id === clickedId).reciever_id;
    this.currentDialogueId = this.dialogs.find(({ id }) => id === clickedId).id;
    this.currentReceiverNickname = this.dialogs.find(({ id }) => id === clickedId).receiverNickname;
    console.log('currentReceiverId = ' + this.currentReceiverId);
    this.getMessages();
  }

  getMessages() {
    // console.log('get messages');
    if (this.isInDialog) {
      this.webconService.getMessages({
        dialogue_id: this.currentDialogueId
      })
        .subscribe(data => this.updateMesgConfiguration(data));
    }
  }

  sendMessage() {
    console.log('send message');
    this.messages.push(new Message(this.newMsg, this.currentUserId, this.currentReceiverId, this.currentDialogueId));
    this.webconService.sendMessage(
      {
        'sender_id': this.currentUserId,
        'receiver_id': this.currentReceiverId,
        'message_body': this.newMsg,
        'dialogue_id' : this.currentDialogueId
      }).subscribe();

    this.getDialogs();  // if new dialog with new user - update dialogs list
  }

  private updateMesgConfiguration(data: any) {

    const newMessages: Message[] = [];
    data.forEach(element => {
      const { sender_id, receiver_id, message_body, dialogue_id} = element;
      
      const message: Message = new Message(message_body, sender_id, receiver_id, dialogue_id);
      newMessages.push(message);
    });
    this.messages = newMessages;
  }

  getDialogs() {
    this.webconService.getDialogs(String(this.currentUserId))
      .subscribe(data => this.updateDialogConfiguration(data));
  }

  updateDialogConfiguration(data: any) {
    const newDialogs: Dialog[] = [];
    data.forEach(element => {
      const { dialogue_id: id , receiver_id, message_body} = element;
      console.log(message_body);

      const dialog: Dialog = new Dialog(id, receiver_id, message_body);
      this.webconService.getUser(String(receiver_id))
        .subscribe(user => dialog.receiverNickname = user.nickname);

      newDialogs.push(dialog);
    });
    this.dialogs = newDialogs;
  }

  findUser() {
    console.log('find user');

    this.webconService.findUser(this.nicknameUserToFind)
      .subscribe(data => {
        this.updateFindConfiguration(data)
        this.webconService.createDialogue({
          'sender_id' : this.currentUserId,
          'receiver_id' : this.currentReceiverId
        }).subscribe(data => {
          this.currentDialogueId = data.dialogue.id;
          this.getMessages();
        })
      });
    this.isInDialog = true;
    // this.getMessages();
  }

  updateFindConfiguration(data: any) {
    console.log('user found with id: ' + data.id);
    console.log(data);
    this.currentReceiverId = data.id;
    this.currentReceiverNickname = data.nickname;
  }

  closeDialog() {
    console.log('close dialog');
    this.isInDialog = false;
    this.messages = [];
    this.currentReceiverId = null;
    this.currentReceiverNickname = '';
    this.currentDialogueId = null;
  }

  ngOnDestroy() {
    // this._mesgSub.unsubscribe();
    this.messages = [];
    this.dialogs = [];
    if (this.id) {
      clearInterval(this.id);
    }
  }

}
