import {steps} from "@/lib/consts";
import React from "react";

export default function HowitWorks() {
  return (
    <section className="py-20 container" id="work">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Start Chatting Now</h1>
        <p className="text-muted-foreground">Start chatting with Easy and Quick steps</p>
      </div>
      <div className="mt-10 max-md:flex-col flex justify-center items-center gap-3">
        {steps.map((item, i) => (
          <div key={i} className="max-md:w-full bg-secondary rounded-lg p-2">
            <div className="text-primary text-xl font-bold mb-2">{i + 1}</div>
            <div>{item.title}</div>
            <div className="text-muted-foreground">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
