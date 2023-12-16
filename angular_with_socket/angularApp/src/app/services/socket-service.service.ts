import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  isBrowser: boolean | undefined;
  socket: any;
  // uri: string = "ws://localhost:3000";
  uri: string = "http://localhost:3000";

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.socket = io(this.uri);
    }
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  close() {
    this.socket.close();
  }

}
