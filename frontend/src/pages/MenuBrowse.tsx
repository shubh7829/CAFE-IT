import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function MenuBrowse(){
  const [items,setItems]=useState<any[]>([]);
  useEffect(()=>{ (async()=>{ const res=await api.get("/menu/search"); setItems(res.data); })(); },[]);
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(it=>(
        <div key={it._id} className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold">{it.title}</h3>
          <div className="text-sm text-gray-500">{it.category}</div>
          <div className="mt-2">₹{it.price}</div>
          <button className="mt-2 bg-amber-600 text-white px-3 py-1 rounded">Add to cart</button>
        </div>
      ))}
    </div>
  );
}
