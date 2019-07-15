import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Comic, PageResponse } from '../types/responses';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  constructor(private client: ClientService) { }

  getComics() {
    return this.client.get<PageResponse<Comic>>('comics', {})
      .pipe(tap(comics => {
        comics.data.forEach(comic => {
          comic.pictures = comic.pictures.map(pic => pic.replace('https', 'http'));
        });
      }));
  }
}
