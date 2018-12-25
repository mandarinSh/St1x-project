import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dialog } from '../dialog';
import { Message } from '../message';
import { WebconnectionService } from '../webconnection.service';
import { User } from '../user';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-dialogpage',
  templateUrl: './dialogpage.component.html',
  styleUrls: ['./dialogpage.component.css'],
})
export class DialogpageComponent implements OnInit, OnDestroy {

  // currentSubject: User = new User('Alex');
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


  constructor( private router: Router,
    private webconService: WebconnectionService) {
      this.currentUserId = webconService.currentUserId;
      if (this.currentUserId === null) {
        this.router.navigate(['/loginpage']);
        alert('Error! you are not logged in.');
      }
      const dialogTmp: Dialog = new Dialog;
      dialogTmp.email = 'user_1@mail.ru';
      dialogTmp.message_body = 'hello mandarin';
      dialogTmp.name = 'user-1';
      dialogTmp.sender_id = 1;
      dialogTmp.subject_id = this.currentUserId;
      this.dialogs.push(dialogTmp);
      console.log(this.webconService.currentUserId);
    }

  ngOnInit() {
    this.currentUserId = this.webconService.currentUserId;
    // console.log(this.currentUserId);
    // if (this.currentUserId === null) {
    //   this.router.navigate(['/loginpage']);
    //   alert('Error! you are not logged in.');
    // }
    // const dialogTmp: Dialog = new Dialog;
    // dialogTmp.email = 'user_1@mail.ru';
    // dialogTmp.message_body = 'hello mandarin';
    // dialogTmp.name = 'user-1';
    // dialogTmp.sender_id = 1;
    // dialogTmp.subject_id = this.currentUserId;
    // this.dialogs.push(dialogTmp);
    // console.log(this.webconService.currentUserId);
    // this.getDialogs();
  }

  getUsers() {
    this.webconService.getUsers()
      .subscribe(data => console.log(data));
  }

  getMessages() {
    this.isInDialog = true;
    this.webconService.getMessages({
      sender_id : this.currentUserId,
      subject_id : this.currentSubjectId
    }).takeWhile(this.isInDialog)
      .subscribe(data => this.updateMesgConfiguration(data));
  }

  sendMessage() {
    this.messages.push(new Message(this.newMsg));
    this.webconService.sendMessage(
      {'sender_id' : this.currentUserId,
        'subjectId' : this.currentSubjectId,
        'message_body' : this.newMsg,
        'inserted_at' : ''
      });
      // console.log(this.currentUserId);
    // this.getUsers();
  }

  getDialogs() {
    // this.dialogs.push(new Dialog('Ann', 0));

    // this.webconService.getDialogs(String(this.currentUserId))
    //   .subscribe(data => console.log(data));
    // this.webconService.findUser('user_1@mail.ru')
    //   .subscribe(data => console.log(data.user_id));
  }

  private updateMesgConfiguration(data: any) {
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

  findUser() {
    this.webconService.findUser(this.emailUserToFind)
      .subscribe(data => this.updateDialogConfiguration(data));
  }

  updateDialogConfiguration(data: any) {
    console.log(data.user_id);
    this.currentSubjectId = data.user_id;
    this.currentSubjectName = this.webconService.findUser(data.user_id).subscribe();
  }

  closeDialog() {
    this.isInDialog = false;
    this.messages = [];
    this.currentSubjectId = null;
    this.currentSubjectName = '';
  }

  ngOnDestroy() {
    // this._mesgSub.unsubscribe();
    this.messages = [];
    this.dialogs = [];
  }

}
