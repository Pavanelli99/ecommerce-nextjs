export interface ProductInterface {
  name: string;
  price: number;
  description: string;
  images: Image[]
  category: number;
  stock: number;
  rating?: number;

  id?: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;

}

export interface Image{
  id: string;
  url: string;
  product_id: string;
  createdAt: string;
  updatedAt: string;
}