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

  getComics(pageNumber = 1, perPage = 5, filters = {}) {
    return this.client.get<PageResponse<Comic>>(`comics?page=${pageNumber}&perPage=${perPage}`, {})
      .pipe(
        map(resp => this.picturesProtocol(resp)),
        map(resp => {
          resp.data = resp.data.map(comic => {
            return {...comic, image: comic.pictures[0]};
          });
          return resp;
        }),
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
