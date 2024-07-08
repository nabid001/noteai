import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <>
      <div className="mt-10 px-5">
        <h1 className="text-3xl font-medium">All Notes</h1>
      </div>
      <div className="mt-5 px-5">
        <Skeleton className="h-[35px] w-[95px] rounded-sm" />
      </div>

      <div>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="mt-5 px-5">
            <Skeleton className="h-[150px] w-[95%] rounded-sm" />
          </div>
        ))}
      </div>
    </>
  );
};

export default loading;
