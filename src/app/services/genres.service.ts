import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Genre } from '../types/responses';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private client: ClientService) { }

  getGenres() {
    return this.client.get<Genre[]>('genres');
  }
}
