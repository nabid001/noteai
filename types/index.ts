export type CreateUserParams = {
  clerkId: string;
  email: string;
  name: string;
  username: string;
  picture: string;
};

export type UpdateUserParams = {
  clerkId: string;
  email: string;
  name: string;
  username: string;
  picture: string;
  path: string;
};

export type DeleteUserParams = {
  clerkId: string;
};
