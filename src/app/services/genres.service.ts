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

  addNewGenre(genre: Genre) {
    return this.client.post('genres', genre);
  }

  editGenre(genre: Genre) {
    const {id, ...other} = genre;
    return this.client.put(`genres/${id}`, other);
  }

  deleteGenre(genreId: number) {
    return this.client.delete(`genres/${genreId}`);
  }
}
