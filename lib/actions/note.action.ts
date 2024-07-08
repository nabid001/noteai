"use server";

import Note from "@/database/note.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import console from "console";
import User from "@/database/user.model";

type CreateNoteProps = {
  subject: string;
  question: string | undefined;
  answer: string | undefined;
  author: string;
  pathname: string;
};

export const createNote = async ({
  subject,
  question,
  answer,
  author,
  pathname,
}: CreateNoteProps) => {
  try {
    await connectToDatabase();

    const note = await Note.create({
      subject,
      question,
      answer,
      author,
    });

    revalidatePath(pathname);

    return JSON.parse(JSON.stringify(note));
  } catch (error) {
    console.log(error);
    throw new Error("Error creating note");
  }
};

export const recentSavedNotes = async ({
  filter,
  author,
}: {
  filter?: string;
  author: string;
}) => {
  try {
    await connectToDatabase();

    if (!author) {
      throw new Error("Author is required");
    }

    const notes = await Note.find({
      author,
      ...(filter && filter.toLowerCase() !== "all"
        ? { subject: { $regex: new RegExp(filter, "i") } }
        : {}),
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({ path: "author", model: User, select: "_id clerkId" });

    return JSON.parse(JSON.stringify(notes));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  //   console.log(noteId);
  try {
    await connectToDatabase();

    await Note.deleteOne({ _id: noteId });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
