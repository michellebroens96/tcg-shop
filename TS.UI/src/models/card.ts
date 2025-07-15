export interface Card {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  price: string;
  foil?: boolean;
}
