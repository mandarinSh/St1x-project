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

  private dbURL = 'http://192.168.43.204:4000/api/users';

  constructor (private http: HttpClient) {}

  getUsers(): any {
    return this.http.get(this.dbURL, httpOptions)
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
