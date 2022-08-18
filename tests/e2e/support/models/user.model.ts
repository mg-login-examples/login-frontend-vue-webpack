export interface UserModel {
  id: number;
  email: string;
  is_active: boolean;
  is_verified: boolean;
  quotes: [];
  liked_quotes: [];
}
