import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messages: Message[] = [];

  add(message: string, type: number) {
    this.messages.push(new Message(message, type));
  }

  clear() {
    this.messages = [];
  }
}
