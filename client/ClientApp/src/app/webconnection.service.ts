import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse, ɵHttpInterceptingHandler,
  HttpHandler, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebconnectionService {

  // private serverURL = 'http://192.168.43.204:4000/api';
  // private serverURL = 'http://192.168.0.165:4000/api';
  // private serverURL = 'http://192.168.1.130:4000/api';
  // private serverURL = 'http://cb32d798.ngrok.io/api';
  private serverURL = 'http://51.158.108.94/api';
  private dbUsersURL = this.serverURL + '/users'; // we need this ?
  private dbUserURL = this.serverURL + '/get_user';
  private dbSignInPostURL = this.serverURL + '/sign_in';
  private dbSignUpPostURL = this.serverURL + '/sign_up';
  private dbMessagesURL = this.serverURL + '/get_messages_of_dialog';
  private dbMessagePostURL = this.serverURL + '/send_message';
  private dbDialogsURL = this.serverURL + '/get_last_messages';
  private dbFindUserURL = this.serverURL + '/get_user';
  private dbDialoguePostURL = this.serverURL + '/create_dialogue';

  public currentUserId: number;

  constructor(private http: HttpClient) {
    console.log('initializing service');
  }

  // we need this ?
  getUsers(): any {
    return this.http.get(this.dbUsersURL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUser(id: any): any {
    const params = new HttpParams()
      .set('Content-Type', 'application/json')
      .set('id', id);
    return this.http.get(this.dbUserURL, { params })
      .pipe(catchError(this.handleError));
  }

  getDialogs(id: string) {
    const params = new HttpParams()
      .set('Content-Type', 'application/json')
      .set('user_id', id);
    return this.http.get(this.dbDialogsURL, { params })
      .pipe(catchError(this.handleError));
  }

  getMessages(dialogue: any) {
    const params = new HttpParams()
      .set('Content-Type', 'application/json')
      .set('dialogue_id', dialogue.dialogue_id);
    return this.http.get(this.dbMessagesURL, { params })
      .pipe(catchError(this.handleError));
  }

  findUser(nickname: string) {
    const params = new HttpParams()
      .set('Content-Type', 'application/json')
      .set('nickname', nickname);

    return this.http.get(this.dbFindUserURL, { params })
      .pipe(catchError(this.handleError));
  }

  // POST

  register(regObj: any): any {
    return this.http.post(this.dbSignUpPostURL, regObj, httpOptions)
      .pipe(catchError(this.handleError));
  }

  signIn(signInObj): any {
    return this.http.post(this.dbSignInPostURL, signInObj, httpOptions)
      .pipe(catchError(this.handleError));
  }

  sendMessage(msgObj: any) {
    return this.http.post(this.dbMessagePostURL, msgObj, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createDialogue(dialogueObj: any): any {
    return this.http.post(this.dbDialoguePostURL, dialogueObj, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Handle errors

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Returned code ${error.status}, ` +
        `body: ${error.error}`);
    }
    // alert('Something went wrong!');
    return Rx.throwError('Something went wrong.');
  }

}
