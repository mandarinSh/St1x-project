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

@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css'],
})
export class DialogpageComponent implements OnInit, OnDestroy {

  currentUser: User = null;
  currentUserId: number = null;
  currentSubjectId: number = null;
  currentSubjectName = '';
  emailUserToFind = '';

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

    // const dialogTmp: Dialog = new Dialog;
    // dialogTmp.email = 'user_1@mail.ru';
    // dialogTmp.message_body = 'hello mandarin';
    // dialogTmp.name = 'user-1';
    // dialogTmp.sender_id = 1;
    // dialogTmp.subject_id = this.currentUserId;
    // this.dialogs.push(dialogTmp);
    console.log('currentUserId = ' + this.webconService.currentUserId);
  }

  ngOnInit() {
    // this.currentUserId = this.webconService.currentUserId;
    // this.getMessages();
    // console.log(this.currentUserId);
    if (this.currentUserId === null) {
      this.router.navigate(['/loginpage']);
      console.log('Error! you are not logged in.');
    }
    this.id = window.setInterval(() => {
      this.getMessages();
    }, 5000);
    this.getDialogs();
  }

  getUsers() {
    this.webconService.getUsers()
      .subscribe(data => console.log(data));
  }

  onDialogClick(clickedId: number) {
    this.isInDialog = true;
    this.currentSubjectId = this.dialogs.find(({ id }) => id === clickedId).subject_id;
    console.log('currentSubjectId = ' + this.currentSubjectId);
    this.getMessages();
  }

  getMessages() {
    console.log('get messages');
    if (this.isInDialog) {
      this.webconService.getMessages({
        sender_id: this.currentUserId,
        subject_id: this.currentSubjectId
      })
        .subscribe(data => this.updateMesgConfiguration(data));
    }
  }

  sendMessage() {
    this.messages.push(new Message(this.newMsg));
    this.webconService.sendMessage(
      {
        'sender_id': this.currentUserId,
        'subject_id': this.currentSubjectId,
        'message_body': this.newMsg
      }).subscribe();

    this.getDialogs();  // if new dialog with new user - update dialogs list
  }

  private updateMesgConfiguration(data: any) {

    const newMessages: Message[] = [];
    data.forEach(element => {
      const senderId = element.sender_id;
      const subjectId = element.subject_id;
      const messageBody = element.message_body;

      const message: Message = new Message(messageBody);
      message.senderId = senderId;
      message.subjectId = subjectId;
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
      const id = element.id;
      const subjectId = element.subject_id;
      const messageBody = element.message_body;

      const dialog: Dialog = new Dialog();
      dialog.id = id;
      dialog.subject_id = subjectId;
      dialog.message_body = messageBody;
      newDialogs.push(dialog);
    });
    this.dialogs = newDialogs;
  }

  findUser() {
    console.log('find user');

    this.webconService.findUser(this.emailUserToFind)
      .subscribe(data => this.updateFindConfiguration(data));
    this.isInDialog = true;
    this.getMessages();
  }

  updateFindConfiguration(data: any) {
    console.log('user found with id: ' + data[0].id);
    console.log(data);
    this.currentSubjectId = data[0].id;
    this.currentSubjectName = data[0].first_name;
    // this.webconService.findUser(data[0].id)
    //   .subscribe(dat => this.currentSubjectName = dat[0].first_name);
  }

  closeDialog() {
    console.log('close dialog');
    this.isInDialog = false;
    this.messages = [];
    this.currentSubjectId = null;
    this.currentSubjectName = '';
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
