import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="w-fit h-10">
      <img src="/logo.png" alt="Talk2pdf" className="h-10 object-cover" />
    </Link>
  );
}
