import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  lower_bound: number,
  upper_bound: number,
  trigger_alert: number | undefined,
  ratio: number,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const lowerBound = (1 - .10);
    const upperBound = (1 + .10);
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      ratio,
      trigger_alert: (ratio < lowerBound || ratio > upperBound) ? ratio : undefined,
      upper_bound: upperBound,
      lower_bound: lowerBound,
    };
  }
}
