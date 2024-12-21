"use client";

import Link from "next/link";
import {useUser} from "./UserContext";
import {ArrowUpRight} from "lucide-react";

export default function StartBtn() {
  const {user} = useUser();
  return (
    <>
      {user ? (
        <Link
          className={`min-w-24 bg-primary px-2 py-1.5 rounded-full flex justify-center items-center gap-2 hover:bg-primary/80 transition-all duration-300`}
          href={`/dashboard`}
        >
          Dashboard
          <ArrowUpRight size={18} />
        </Link>
      ) : (
        <Link
          className={`min-w-24 bg-primary px-2 py-1.5 rounded-full flex justify-center items-center hover:bg-primary/80 transition-all duration-300`}
          href={`/signin`}
        >
          Signin
        </Link>
      )}
    </>
  );
}
