import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Publisher } from '../types/responses';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor(private client: ClientService) { }

  getPublishers() {
    return this.client
      .get<Publisher[]>('publishers');
  }

  addNewPublisher(publisher: Publisher) {
    return this.client.post('publishers', publisher);
  }

  deletePublisher(publisherId: number) {
    return this.client.delete(`publishers/${publisherId}`);
  }
}
