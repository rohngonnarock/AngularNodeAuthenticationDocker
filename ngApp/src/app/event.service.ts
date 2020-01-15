import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService {

  private _eventsUrl = "https://ngapi.azurewebsites.net/api/events";
  private _specialEventsUrl = "https://ngapi.azurewebsites.net/api/special";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }
}