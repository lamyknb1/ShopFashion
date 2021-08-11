import {Status} from 'tslint/lib/runner';

export class Order {
  orderId?: number;
  dateTime?: Date;
  total?: number;
  deliveryAddress?: string;
  phoneOrder?: string;
  status?: StatusEnum;
}
