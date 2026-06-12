"use client";

import { useEffect } from "react";
import { getQuote }
from "@/features/market/marketService";

export default function TestMarket() {

  useEffect(() => {

    async function fetchData() {

      const data =
        await getQuote(
          "BANKNIFTY"
        );

      console.log(data);

    }

    fetchData();

  }, []);

  return (
    <h1>
      Market Test
    </h1>
  );
}