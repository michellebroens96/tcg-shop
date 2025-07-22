import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TcgcsvService {
  url = 'https://tcgcsv.com/tcgplayer/74/';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.url + 'groups');
  }

  getDoaData() {
    return forkJoin({
      products: this.http.get(this.url + '23128/products'),
      prices: this.http.get(this.url + '23128/prices'),
    });
  }

  getDtrData() {
    return this.http.get(this.url + '24366/products');
  }
}
