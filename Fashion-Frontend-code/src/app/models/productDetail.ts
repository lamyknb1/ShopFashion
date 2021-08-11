import { Color } from './color';
import { Size } from './size';
import {Product} from './product';
import {Order} from './order';

export class ProductDetail {
  detailId?: number;
  quantity?: number;
  size?: Size;
  color?: Color;
  product?: Product;
  order?: Order;
}
