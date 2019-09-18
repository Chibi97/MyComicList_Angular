import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { AuthorRead, AuthorWrite } from '../types/responses';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private client: ClientService) { }

  getAuthors() {
    return this.client.get<AuthorRead[]>('authors');
  }

  addNewAuthor(author: AuthorWrite) {
    return this.client.post('authors', author);
  }

  editAuthor(author: AuthorWrite) {
    const { id, ...other } = author;
    return this.client.put(`authors/${id}`, other);
  }

  deleteAuthor(authorId: number) {
    return this.client.delete(`authors/${authorId}`);
  }
}
