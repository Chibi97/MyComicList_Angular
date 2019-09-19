import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Comic, PageResponse } from '../types/responses';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ComicSubmitData } from '../admin/forms/comic-form/comic-form.component';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  constructor(private client: ClientService) { }

  createComic(data: ComicSubmitData) {
    return this.client.post('comics', this.toFormData(data));
  }

  editComic(comic: ComicSubmitData) {
    const { id, ...other } = comic;
    return this.client.put(`comics/${id}`, this.toFormData(other));
  }

  deleteComic(comicId: number) {
    return this.client.delete(`comics/${comicId}`);
  }

  getComics(pageNumber = 1, perPage = 6, filters = []) {
    let httpParams = new HttpParams();
    filters.forEach(filter => {
      const name = filter.name;
      filter.values.forEach(val => {
        httpParams = httpParams.append(name, val);
      });
    });

    httpParams = httpParams.set('page', '' + pageNumber);
    httpParams = httpParams.set('perPage', '' + perPage);

    return this.client.get<PageResponse<Comic>>('comics', httpParams)
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

  toFormData(formData: ComicSubmitData): FormData {
    const fd = new FormData();
    fd.append('publisher', '' + formData.publisher);
    fd.append('name', formData.name);
    fd.append('issues', '' + formData.issues);
    fd.append('description', formData.description);
    fd.append('publishedAt', moment(formData.publishedAt).format('YYYY-MM-DD'));
    formData.authors.forEach((author) => fd.append('authors', '' + author));
    formData.genres.forEach((genre) => fd.append('genres', '' + genre));
    if (formData.selectedFile) {
      fd.append('image', formData.selectedFile);
    }

    return fd;
  }
}
