import React from "react";

import Notes from "@/components/shared/Notes";
import SelectTor from "@/components/shared/Select";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserByClerkId } from "@/lib/actions/user.action";

type AllNotesProps = {
  searchParams: {
    subject: string;
  };
};

const AllNotes = async ({ searchParams: { subject } }: AllNotesProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-up");
  }

  const mongoUser = await getUserByClerkId({ clerkId: userId });

  return (
    <>
      <div className="mt-10 px-5">
        <h1 className="text-3xl font-medium">All Notes</h1>

        <div className="mt-7">
          <SelectTor />
        </div>

        <div className="mt-7">
          <Notes
            type="all-note"
            currentSubject={subject}
            author={mongoUser._id}
            clerkId={userId}
          />
        </div>
      </div>
    </>
  );
};

export default AllNotes;
