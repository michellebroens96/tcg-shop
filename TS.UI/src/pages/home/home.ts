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
    this.tcgcsvService.getDoaData().subscribe(({ products, prices }) => {
      const productResults = (products as any).results;
      const priceResults = (prices as any).results;

      const priceMap = new Map<
        number,
        { marketPrice: string; midPrice: string }
      >();
      for (const price of priceResults) {
        priceMap.set(price.productId, {
          marketPrice: price.marketPrice,
          midPrice: price.midPrice,
        });
      }

      const cards: Card[] = productResults.map((product: any) => {
        const price = priceMap.get(product.productId);
        return {
          productId: product.productId,
          name: product.name,
          imageUrl: product.imageUrl,
          subTypeName: product.subTypeName,
          marketPrice: price?.marketPrice ?? '',
          midPrice: price?.midPrice ?? '',
        };
      });

      this.cards.set(cards);
      console.log(this.cards());
    });
  }
}
