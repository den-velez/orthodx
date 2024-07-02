export interface IDoctor {
  id?: string;
  greetings: string;
  email: string;
  name: string;
  avatar?: string;
  credits: number;
  paidCredits: number;
  memberCredits: number;
  membershipExpireAt: string;
  createdAt: string;
  updatedAt: string;
}
