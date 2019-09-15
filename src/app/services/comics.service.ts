import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Comic, PageResponse } from '../types/responses';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  constructor(private client: ClientService) { }

  getComics() {
    return this.client.get<PageResponse<Comic>>('comics', {})
      .pipe(
        map(resp => this.picturesProtocol(resp)),
        catchError(_ => {
          const pr: PageResponse<Comic> = {
            currentPage: 0,
            data: [] as Comic[],
            pageCount: 0,
            perPage: 0,
            totalCount: 0
          };

          return of(pr);
        })
      );
  }

  picturesProtocol(resp: PageResponse<Comic>) {
    const comics = resp.data;
    resp.data = comics.map(comic => {
      comic.pictures = comic.pictures.map(pic => pic.replace('https', 'http'));
      return comic;
    });

    return resp;
  }
}
