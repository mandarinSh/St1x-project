import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpHeaders, HttpClient, HttpErrorResponse, ɵHttpInterceptingHandler, HttpHandler, HttpParams } from '@angular/common/http';
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
  private serverURL = 'http://localhost:4000/api';
  // private serverURL = 'http://cb32d798.ngrok.io/api';
  private dbUsersURL = this.serverURL + '/users'; // we need this ?
  private dbUserURL = this.serverURL + '/get_user';
  private dbSignInPostURL = this.serverURL + '/sign_in';
  private dbSignUpPostURL = this.serverURL + '/sign_up';
  private dbMessagesURL = this.serverURL + '/get_messages_of_dialog';
  private dbMessagePostURL = this.serverURL + '/send_message';
  private dbDialogsURL = this.serverURL + '/get_last_messages';
  private dbFindUserURL = this.serverURL + '/get_user';

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

  getDialogs(id: string): any {
    const params = new HttpParams()
      .set('Content-Type', 'application/json')
      .set('user_id', id);
    return this.http.get(this.dbDialogsURL, { params })
      .pipe(catchError(this.handleError));
  }

  getMessages(dialogue: any): any {
    const params = new HttpParams()
      .set('Content-Type', 'application/json')
      .set('dialogue_id', dialogue.dialogue_id);
    return this.http.get(this.dbMessagesURL, { params })
      .pipe(catchError(this.handleError));
  }

  findUser(nickname: string): any {
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



// export class WebconnectionService {

//   private subject: Rx.Subject<MessageEvent>;

//   constructor() { }

//   public connect(url): Rx.Subject<MessageEvent> {
//     if (!this.subject) {
//       this.subject = this.create(url);
//       console.log('Successfully connected: ' + url);
//     }
//     return this.subject;
//   }

//   private create(url): Rx.Subject<MessageEvent> {
//     let wc = new WebSocket(url);

//     let observable = Rx.Observable.create(
//       (obs: Rx.Observer<MessageEvent>) => {
//       wc.onmessage = obs.next.bind(obs);
//       wc.onerror = obs.error.bind(obs);
//       wc.onclose = obs.complete.bind(obs);
//       return wc.close.bind(wc);
//     });

//     let observer = {
//       next: (data: Object) => {
//         if (wc.readyState === WebSocket.OPEN) {
//           wc.send(JSON.stringify(data));
//         }
//       }
//     };
//     return Rx.Subject.create(observer, observable);
//   }


// }
