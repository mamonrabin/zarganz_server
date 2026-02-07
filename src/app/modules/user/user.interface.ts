export type TUser = {
  name: string;
  email: string;
  password: string;
  image?: string | undefined;
  phone?: string | undefined;
  address?: string | undefined;
  bio?: string | undefined;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';

   // 🔐 forgot password
  resetPasswordCode?: string | undefined;
  resetPasswordExpires?: Date | undefined;
};