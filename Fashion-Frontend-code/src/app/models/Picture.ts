import {Product} from './product';

export interface Picture {
  pictureId?: number;
  src?: string;
  product?: Product[];
}
