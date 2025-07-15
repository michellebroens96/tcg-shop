import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { InfoCard } from '../../components/info-card/info-card';
import { Card } from '../../models/card';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse';

@Component({
  selector: 'app-home',
  imports: [Navbar, InfoCard],
  templateUrl: './home.html',
})
export class Home {
  cards = signal<Card[]>([]);

  private http = inject(HttpClient);
  ngOnInit() {
    this.http
      .get('assets/csv/FTC.csv', { responseType: 'text' })
      .subscribe((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            this.cards.set(result.data as Card[]);
          },
        });
      });
  }
}
