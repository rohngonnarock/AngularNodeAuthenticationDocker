import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config.enum';

@Injectable()
export class EventService {

  private eventsUrl = `${Config.url}/api/events`;
  private specialEventsUrl = `${Config.url}/api/special`;

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this.eventsUrl);
  }

  getSpecialEvents() {
    return this.http.get<any>(this.specialEventsUrl);
  }
}
