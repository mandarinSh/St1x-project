// import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs';
// import { HttpHeaders, HttpClient, HttpErrorResponse, ɵHttpInterceptingHandler,
//   HttpHandler, HttpParams } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
//
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
//
// @Injectable({
//   providedIn: 'root'
// })
// export class WebconnectionMockService {
//
//   private serverURL = 'http://51.158.108.94/api';
//   private dbUsersURL = this.serverURL + '/users'; // we need this ?
//   private dbUserURL = this.serverURL + '/get_user';
//   private dbSignInPostURL = this.serverURL + '/sign_in';
//   private dbSignUpPostURL = this.serverURL + '/sign_up';
//   private dbMessagesURL = this.serverURL + '/get_messages_of_dialog';
//   private dbMessagePostURL = this.serverURL + '/send_message';
//   private dbDialogsURL = this.serverURL + '/get_last_messages';
//   private dbFindUserURL = this.serverURL + '/get_user';
//   private dbDialoguePostURL = this.serverURL + '/create_dialogue';
//
//   public currentUserId: number;
//
//   constructor(private http: HttpClient) { }
//
//   // getUsers(): any {
//   //   return this.http.get(this.dbUsersURL, httpOptions)
//   //     .pipe(catchError(this.handleError));
//   // }
//
//   getUser(id: any): any {
//     const someUser = {
//       'id': 1,
//       'nickname': 'mandarin'
//     };
//     return someUser;
//   }
//
//   getDialogs(id: string) {
//     const someLastMessages = [{
//       'id': 3,
//       'message_body': 'fine thanks',
//       'dialogue_id': 1,
//       'sender_id': 1,
//       'receiver_id': 1
//     }];
//     return someLastMessages;
//   }
//
//   getMessages(dialogue: any) {
//     const someLastMessages = [{
//       'id': 1,
//       'message_body': 'hey there',
//       'dialogue_id': 1,
//       'sender_id': 2,
//       'receiver_id': 1
//     },
//       {
//         'id': 2,
//         'message_body': 'how are you?',
//         'dialogue_id': 1,
//         'sender_id': 2,
//         'receiver_id': 1
//       },
//       {
//         'id': 3,
//         'message_body': 'fine thanks',
//         'dialogue_id': 1,
//         'sender_id': 1,
//         'receiver_id': 1
//       }];
//     return someLastMessages;
//   }
//
//   findUser(nickname: string) {
//     const someUser = {
//       'id': 1,
//       'nickname': 'mandarin'
//     };
//
//     return someUser;
//   }
//
//   // POST
//
//   register(regObj: any): any {
//     return {
//       'ok': 'signed_up',
//       'user': {
//         'id': 3,
//         'nickname': 'man2'
//       }};
//   }
//
//   signIn(signInObj): any {
//     return {
//       'ok': 'signed_in',
//       'user': {
//         'id': 3,
//         'nickname': 'man2'
//       }};
//   }
//
//   sendMessage(msgObj: any) {
//     return {
//       'message_sent': ['ok'],
//       'msg':
//         {
//           'id': 4,
//           'message_body': 'how are you?',
//           'dialogue_id': 1,
//           'sender_id': 2,
//           'receiver_id': 1
//         }};
//   }
//
//   createDialogue(dialogueObj: any): any {
//     return {
//       'dialogue':
//         {
//           'id': 2,
//           'participators': [3, 2]
//         },
//       'message': 'dialogue created'
//     };
//   }
//
// }
