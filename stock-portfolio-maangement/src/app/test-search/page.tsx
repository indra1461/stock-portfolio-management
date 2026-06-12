"use client";
import { useEffect } from "react";
import { searchStocks } from "@/features/search/searchService";

export default function TestSearch() {

  useEffect(() => {
    async function run(){
        const data  = await searchStocks("AAPL");
        console.log(data);
    }
    run();
},[]);

  return (
    <h1>
      Search Test   
    </h1>
  );
}