export interface IProduct {
  id: string;
  name: string;
  description: string;
  active: boolean;
  credits: number;
  price: number;
  priceID: string;
  createdAt: string;
  updatedAt: string;
  justOnePayment: boolean;
  suscriptionMonths: number;
  category: "credits" | "basic" | "plus";
}

export interface INewProduct extends Omit<IProduct, "id"> {}
