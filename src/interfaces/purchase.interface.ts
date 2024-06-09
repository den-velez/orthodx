export interface IPurchase {
  id: string;
  doctorId: string;
  doctorEmail: string;
  productId: string;
  date: string;
  amount: number;
  description: string;
  paymentMethod?: string;
}

export interface INewPurchase extends Omit<IPurchase, "id"> {}
