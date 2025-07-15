import { Component, input } from '@angular/core';
import { Card } from '../../models/card';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-info-card',
  imports: [NgClass, NgStyle],
  templateUrl: './info-card.html',
})
export class InfoCard {
  card = input<Card>();
}
