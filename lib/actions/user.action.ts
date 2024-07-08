"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, UpdateUserParams } from "@/types";
import { revalidatePath } from "next/cache";

export async function getUserByClerkId({ clerkId }: { clerkId: string }) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser({
  clerkId,
  email,
  name,
  username,
  picture,
  path,
}: UpdateUserParams) {
  try {
    await connectToDatabase();

    await User.findOneAndUpdate(
      { clerkId },
      { email, name, username, picture },
      {
        new: true,
      }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser({ clerkId }: { clerkId: string }) {
  try {
    await connectToDatabase();

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // TODO: delete user notes

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
