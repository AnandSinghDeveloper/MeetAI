import React from "react";

import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { string } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface GeneratedAvtarProps {
  seed: string;
  className?: string;
  varient: "initials" | "botttsNeutral";
}

const GeneratedAvtar = ({ seed, varient, className }: GeneratedAvtarProps) => {
  let avtar;

  if (varient === "botttsNeutral") {
    avtar = createAvatar(botttsNeutral, {
      seed,
    });
  } else {
    avtar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avtar.toDataUri()} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default GeneratedAvtar;
