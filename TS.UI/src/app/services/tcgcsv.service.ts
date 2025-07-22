import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Card } from '../../models/card';

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
    }).pipe(
      map(({ products, prices }) =>
        this.mergeProductsWithPrices(products, prices)
      )
    );
  }

  getDtrData() {
    return forkJoin({
      products: this.http.get(this.url + '24366/products'),
      prices: this.http.get(this.url + '24366/prices'),
    }).pipe(
      map(({ products, prices }) =>
        this.mergeProductsWithPrices(products, prices)
      )
    );
  }

  mergeProductsWithPrices(productsResponse: any, pricesResponse: any): Card[] {
    const productResults = productsResponse.results;
    const priceResults = pricesResponse.results;

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

    return productResults.map((product: any) => {
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
  }
}
