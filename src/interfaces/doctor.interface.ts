export interface IDoctor {
  id?: string;
  createdAt: string;
  updatedAt: string;
  greetings: string;
  email: string;
  name: string;
  avatar?: string;
  paidCredits: number;
  memberCredits: number;
  subscriptionActive: boolean;
  memberCreditsExpireAt: string;
  paidCreditsExpireAt: string;
  membershipExpireAt: string;
}

export interface IUpdateByPurchase {
  updatedAt: string;
  subscriptionActive?: boolean;
  membershipExpireAt?: string;
  memberCredits?: number;
  memberCreditsExpireAt?: string;
  paidCredits?: number;
  paidCreditsExpireAt?: string;
}
