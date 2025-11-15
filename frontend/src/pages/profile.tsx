// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";

// interface User {
//   name: string;
//   email: string;
//   role: "user" | "restaurant";
//   profilePic?: string;
//   joinedDate?: string;
// }

// const ProfilePage: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (!user)
//     return <div className="text-center mt-20 text-gray-600 text-lg">Loading Profile...</div>;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50"
//     >
//       <Card className="w-[400px] rounded-2xl shadow-2xl border-0 bg-white p-6">
//         <CardContent className="flex flex-col items-center">
//           <Avatar className="h-24 w-24 mb-5">
//             <AvatarImage src={user.profilePic || "https://via.placeholder.com/150"} />
//             <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//           </Avatar>

//           <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
//           <p className="text-gray-600 text-sm">{user.email}</p>
//           <p className="text-gray-500 text-xs mt-1">
//             Member since: {user.joinedDate || "2025"}
//           </p>

//           <span className="mt-3 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
//             {user.role === "restaurant" ? "Restaurant Owner" : "Customer"}
//           </span>

//           <div className="mt-6 w-full flex flex-col gap-3">
//             <Button variant="outline" className="w-full">
//               Edit Profile
//             </Button>
//             <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
//               Logout
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default ProfilePage;
import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const nav = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow">
        <div className="text-center">
          <img src={user.profilePic || "/avatar.png"} className="w-24 h-24 rounded-full mx-auto" alt="avatar" />
          <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="mt-2 text-gray-500">{user.role}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => nav("/edit-profile")} className="px-4 py-2 bg-gray-200 rounded">Edit Profile</button>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">Logout</button>
        </div>
      </div>
    </div>
  );
}
