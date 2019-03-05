import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class PlanetService {
  uri = 'http://localhost:4000';

  private planetsSource = new Subject<Object[]>();

  planets$ = this.planetsSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  setNextPlanetsSource(planets) {
    this.planetsSource.next(planets);
  }

  getPlanetList(page) {
    return this.httpClient.get(`${this.uri}/api/planets/${page}`);
  }

  getResidentName(num: string) {
    return this.httpClient.get<string>(`${this.uri}/api/residents/${num}`).pipe(
      map(
        (el) => {
          return el['name'];
        }
      )
    );
  }

  getFilmName(num: string) {
    return this.httpClient.get(`${this.uri}/api/films/${num}`).pipe(
      map(
        (el) => {
          return el['title'];
        }
      )
    );
  }

  getPageNum(parse): number {
    const phrase = parse;
    const myRegexp = /page=(.*)/;
    const match = myRegexp.exec(phrase);

    return Number(match[1]);
  }

  returnNumber(uri: string): string {
    const numberPattern = /\d+/g;
    const matches = uri.match( numberPattern);

    if (matches) {
      return matches[0];
    }
    return null;
  }
}
