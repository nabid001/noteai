import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <div className="mt-10 flex flex-col items-center justify-center gap-3">
        <h1 className="mb-7 text-4xl font-semibold">Start Taking Note</h1>
      </div>
      <div className="px-5">
        <Skeleton className="h-[25px] w-[90%] rounded-sm " />
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-[25px] w-16 rounded-sm " />
          <Skeleton className="h-[25px] w-16 rounded-sm " />
        </div>
        <Skeleton className="mt-4 h-[25px] w-16 rounded-sm " />
      </div>
    </>
  );
};

export default loading;
