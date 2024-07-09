"use client";

import React from "react";

const page = () => {
  const handleError = () => {
    throw new Error("Testing error");
  };
  return <button onClick={() => handleError()}>Click</button>;
};

export default page;
