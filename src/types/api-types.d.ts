type Product = {
  description: string;
  id: string;
  price: number;
  title: string;
};

export interface ProductsList {
  message: string;
  data: Array<Product>;
}

export interface ProductById {
  message: string;
  data: Product;
}

export interface NotFound {
  message: string;
  data: null;
}
