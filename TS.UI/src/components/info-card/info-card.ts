import { Component, input } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-info-card',
  imports: [],
  templateUrl: './info-card.html',
})
export class InfoCard {
  card = input<Card>();
}
