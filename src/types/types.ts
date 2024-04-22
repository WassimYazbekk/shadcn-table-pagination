export type Admin = {
  id: number | bigint;
  name: string;
};

export type AuthStateContext = {
  admin: Admin | null;
  setAdmin: (admin: Admin | null) => void;
};

export type Log = {
  id: number | bigint;
  title: string;
  message: string;
  userId: number | bigint;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number | bigint;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  phone: string;
  access: string;
  createdAt: string;
  updatedAt: string;
};
