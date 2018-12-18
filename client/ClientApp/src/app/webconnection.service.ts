import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class WebconnectionService {

  private subject: Rx.Subject<MessageEvent>;

  constructor() { }

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let wc = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
      wc.onmessage = obs.next.bind(obs);
      wc.onerror = obs.error.bind(obs);
      wc.onclose = obs.complete.bind(obs);
      return wc.close.bind(wc);
    });

    let observer = {
      next: (data: Object) => {
        if (wc.readyState === WebSocket.OPEN) {
          wc.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }


}
