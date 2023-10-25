type Product = {
  description: string;
  id: string;
  price: number;
  title: string;
};

type ProductWithStock = Product & {
  count: number;
};

export interface ProductsList {
  message: string;
  data: Array<ProductWithStock>;
}

export interface ProductById {
  message: string;
  data: Product;
}

export interface NotFound {
  message: string;
  data: null;
}
export interface Error {
  message: string;
  error: string;
}

export interface ProductSaved {
  message: string;
  data: Product;
}
export interface CreateProductBody {
  title: string;
  description: string;
  price: number;
}
