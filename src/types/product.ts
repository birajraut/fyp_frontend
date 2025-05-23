export interface IProduct {
  id: string;
  title: string;
  description: string;
  price?: number | string;
  image?: string;
  foodtype?: string;
  restaurant_id?: string;
}
