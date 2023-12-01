export interface ProductInterface{
  name: string;
  price: number;
  description: string;
  images: string[];
  category: number;
  stock: number;
  rating?: number;

  id?: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;

}