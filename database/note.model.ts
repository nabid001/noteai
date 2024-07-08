import { Schema, model, models } from "mongoose";

export type NoteProps = {
  _id: string;
  subject: string;
  question: string;
  answer: string;
  author: {
    _id: string;
    username: string;
    clerkId: string;
    email: string;
    picture: string;
  };
  createdAt: Date;
};

const NoteSchema = new Schema({
  subject: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  author: { type: Schema.ObjectId, ref: "User", readonly: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Note = models.Note || model("Note", NoteSchema);

export default Note;
