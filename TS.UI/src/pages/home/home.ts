import { Component, input } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { InfoCard } from '../../components/info-card/info-card';
import { Card } from '../../models/card';

@Component({
  selector: 'app-home',
  imports: [Navbar, InfoCard],
  templateUrl: './home.html',
})
export class Home {
  cards = input<Card[]>([
    {
      id: 0,
      name: 'Sample Card',
      description: 'This is a sample card description.',
      price: '€10',
      imageUrl: 'assets/images/placeholder.jpg',
    },
  ]);
}
