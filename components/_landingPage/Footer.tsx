import Logo from "@/app/(auth)/components/Logo";
import React from "react";

export default function Footer() {
  return (
    <section className="py-10 border-t flex justify-center items-center">
      <div>
        <div className="mx-auto w-fit">
          <Logo />
        </div>
        <div className="mt-2 text-muted-foreground">&copy; 2024, All rights reserved.</div>
      </div>
    </section>
  );
}
