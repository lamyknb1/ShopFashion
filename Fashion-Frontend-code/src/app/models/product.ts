export class Product {
  productId?: number;
  name?: string;
  price?: number;
  description?: string;
  quantity?: number;
  category?: {
    categoryId?: number;
    categoryName?: string;
  };
  supplier?: {
    supplierId?: number;
    supplierName?: string;
  };
  // date?: string;
}
