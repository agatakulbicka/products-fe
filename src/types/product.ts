export interface ProductImage {
  name: string;
  url: string;

}

export interface Product {
  id: string;
  name: string;
  number: string;
}

export interface ProductDetails extends Product {
  description: string;
  images?: ProductImage[];
  updatedAt: Date;
}

export interface ProductsPagination {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsList {
  products: Product[];
  pagination: ProductsPagination;
}
