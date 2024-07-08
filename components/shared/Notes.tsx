import React from "react";
import { recentSavedNotes } from "@/lib/actions/note.action";
import Metric from "./Metric";
import { NoteProps } from "@/database/note.model";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type NotePageProps = {
  type: "home" | "all-note";
  currentSubject?: string;
  author: string;
  clerkId: string;
};

const Notes = async ({
  type,
  currentSubject,
  author,
  clerkId,
}: NotePageProps) => {
  const notes = await recentSavedNotes({
    author,
    filter: currentSubject,
  });

  return (
    <>
      {type === "home" && notes.length > 0 && (
        <h2 className="mt-11 text-xl font-semibold text-black/90">
          Recent saved notes
        </h2>
      )}
      <div className="flex gap-3 max-sm:flex-col max-sm:gap-5">
        {notes.length > 0 ? (
          notes.map((note: NoteProps) => (
            <div key={note._id}>
              <Card className="max-w-sm shadow-md ">
                <CardHeader>
                  <CardTitle>{note.question}</CardTitle>
                  <CardDescription className="w-fit rounded-full bg-orange-300 px-2 text-[12px] font-bold capitalize text-black/80">
                    {note.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{note.answer}</p>
                </CardContent>
                <CardFooter>
                  {clerkId === note.author.clerkId && (
                    <Metric noteId={note._id} />
                  )}
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-lg font-medium">Oops, found nothing</p>
        )}
      </div>
    </>
  );
};

export default Notes;
