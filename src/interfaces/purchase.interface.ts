export interface IPurchase {
  id: string;
  doctorEmail: string;
  productId: string;
  priceID: string;
  amount: number;
  paymentMethod?: string;
  onePayment: boolean;
}

export interface INewPurchase extends Omit<IPurchase, "id"> {}
