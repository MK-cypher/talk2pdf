"use client";
import React, {useState} from "react";
import PriceType from "../pricing/PriceType";
import {prices} from "@/lib/consts";
import PriceCard from "../pricing/PriceCard";

export default function PricingSection() {
  const [type, setType] = useState<"monthly" | "annual">("monthly");
  return (
    <section className="py-20 container">
      <h1 className="text-4xl font-bold text-center mb-10">Best Prices</h1>
      <div>
        <PriceType type={type} setType={setType} />
      </div>
      <div className="container pricing-container flex max-sm:flex-col items-stretch justify-center mt-10 gap-3">
        {prices.map((item, i) => (
          <PriceCard key={i} item={item} i={i} type={type} />
        ))}
      </div>
    </section>
  );
}
