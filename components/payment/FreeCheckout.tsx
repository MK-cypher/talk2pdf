import React from "react";
import {Button, buttonVariants} from "../ui/button";

export default function FreeCheckout() {
  return (
    <div className={`${buttonVariants({variant: "secondary"})} bg-background/50 w-full cursor-default`}>
      Free Plan
      <span></span>
    </div>
  );
}
