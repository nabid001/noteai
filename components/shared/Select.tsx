"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjectsForNotePage } from "@/constants";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SelectTor = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramsFilter = searchParams.get("subject");

  const handleClick = (item: string) => {
    console.log("clicked");
    const neUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "subject",
      value: item,
    });

    router.push(neUrl, { scroll: false });
  };

  return (
    <div>
      <Select
        onValueChange={handleClick}
        defaultValue={paramsFilter || undefined}
      >
        <SelectTrigger className="w-fit shadow-md">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          {subjectsForNotePage.map((item) => (
            <SelectItem
              key={item.id}
              value={item.value}
              onClick={() => handleClick(item.value)}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTor;
