import { Colors } from './colors';
import { Size } from './size';
import {Product} from './product';
import {Order} from './order';

export class ProductDetail {
  detailId?: number;
  quantity?: number;
  size?: Size;
  color?: Colors;
  product?: Product;
  order?: Order;
}
