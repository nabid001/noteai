"use client";

import { deleteNote } from "@/lib/actions/note.action";
import Image from "next/image";
import React from "react";
import { toast } from "../ui/use-toast";

const Metric = (noteId: any) => {
  const handleDelete = async ({ id }: { id: string }) => {
    console.log(id);
    try {
      await deleteNote(id);
      toast({
        title: "Note deleted successfully!",
        description: "Your note has been deleted.",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Failed to delete your note",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Image
        src="/assets/icons/trash.svg"
        alt="edit-icon"
        width={18}
        height={18}
        onClick={() => handleDelete({ id: noteId.noteId })}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Metric;
