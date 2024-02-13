export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: number;
  token: string;
};

export type User = {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
};

export type Users = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};
