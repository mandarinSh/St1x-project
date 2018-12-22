import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebconnectionService {

  private dbUsersURL = 'http://192.168.43.204:4000/api/users';
  private dbUserURL = 'http://192.168.43.204:4000/api/users/:id';
  private dbSignInPostURL = 'http://192.168.43.204:4000/api/sign_in';
  private dbSignUpPostURL = 'http://192.168.43.204:4000/api/sign_up';
  private dbDialogsURL = 'http://192.168.43.204:4000/api/dialogs';
  private dbMessagesURL = 'http://192.168.43.204:4000/api/messages';

  constructor (private http: HttpClient) {}

  getUsers(): any {
    return this.http.get(this.dbUsersURL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUser(): any {
    return this.http.get(this.dbUserURL, httpOptions)
      .pipe(catchError(this.handleError));
  }
  getDialogs(): any {
    return this.http.get(this.dbDialogsURL, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getMessages(): any {
    return this.http.get(this.dbMessagesURL, httpOptions)
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Returned code ${error.status}, ` +
        `body: ${error.error}`);
    }
    alert('Something went wrong!');
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
