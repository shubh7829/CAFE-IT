import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import Navbar from '@/components/layout/Navbar';

export default function EditProfile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "" });
  const nav = useNavigate();

  useEffect(() => {
    const d = localStorage.getItem("user");
    if (d) {
      const u = JSON.parse(d);
      setForm({ name: u.name || "", email: u.email || "", phone: u.phone || "", dob: u.dob || "" });
    }
  }, []);

  const save = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.put(`/users/${user.id}`, form);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Saved");
      nav("/profile");
    } catch (err) { console.error(err); alert("Save failed"); }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl mb-4">Edit Profile</h2>
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 mb-2 border" />
      <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 mb-2 border" />
      <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" className="w-full p-2 mb-2 border" />
      <input value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} placeholder="DOB" type="date" className="w-full p-2 mb-2 border"/>
      <div className="flex gap-2">
        <button onClick={save} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
      </div>
    </div>
  );
}
