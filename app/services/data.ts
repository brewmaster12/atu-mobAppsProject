import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Data {
  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    await this.storage.create();
  }

  async set(movie_id:string, value:any) {
    await this.storage.set(movie_id, value);
  }

  async get(movie_id:string) {
    return await this.storage.get(movie_id);
  }
}
