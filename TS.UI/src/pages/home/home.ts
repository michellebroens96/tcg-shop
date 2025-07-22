import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { InfoCard } from '../../components/info-card/info-card';
import { Card } from '../../models/card';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse';
import { TcgcsvService } from '../../app/services/tcgcsv.service';

@Component({
  selector: 'app-home',
  imports: [Navbar, InfoCard],
  templateUrl: './home.html',
})
export class Home {
  cards = signal<Card[]>([]);

  constructor(private tcgcsvService: TcgcsvService) {}

  ngOnInit() {
    this.tcgcsvService.getDoaData().subscribe((cards: Card[]) => {
      this.cards.set(cards);
    });
  }
}
