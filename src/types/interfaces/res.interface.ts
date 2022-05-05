export interface IErrorInterface {
  code: number;
  msg: string;
}

export interface IRes {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: string;
  closeTime: string;
  firstId: number;
  lastId: number;
  count: number;
}
