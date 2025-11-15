// import React, { useEffect, useState } from "react";
// import api from "../lib/api"; // axios instance configured above

// export default function MenuManager() {
//   const [items, setItems] = useState<any[]>([]);
//   const [q, setQ] = useState("");
//   const [currentUser, setCurrentUser] = useState<any>(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setCurrentUser(JSON.parse(userData));
//     }
//   }, []);

//   useEffect(() => {
//     if (currentUser && currentUser.id) {
//       fetchItems();
//     }
//   }, [currentUser]);

//   const fetchItems = async () => {
//     if (!currentUser || !currentUser.id) return;
//     try {
//       const res = await api.get(`/menu/restaurant/${currentUser.id}`);
//       setItems(res.data);
//     } catch (err) {
//       console.error("Failed to fetch menu:", err);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await api.delete(`/menu/${id}`);
//       fetchItems();
//     } catch (err) {
//       console.error("Failed to delete item:", err);
//     }
//   };

//   if (!currentUser) {
//     return <div className="p-6">Please log in to manage your menu.</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex gap-3 mb-4">
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Search menu..."
//         />
//         <button onClick={() => {/* open add modal */}}>Add Item</button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {items
//           .filter((it) =>
//             it.title.toLowerCase().includes(q.toLowerCase())
//           )
//           .map((it) => (
//             <div key={it._id} className="p-4 bg-white rounded-lg shadow">
//               <h3 className="font-semibold">{it.title}</h3>
//               <p className="text-sm text-gray-600">
//                 {it.category} • ₹{it.price}
//               </p>
//               <div className="mt-2 flex gap-2">
//                 <button onClick={() => {/* open edit */}}>Edit</button>
//                 <button onClick={() => handleDelete(it._id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// src/pages/MenuManager.tsx
import React, { useEffect, useState } from "react";
import api from "../lib/api"; // ✅ axios instance

interface MenuItem {
  _id: string;
  title: string;
  category: string;
  price: number;
}

export default function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [q, setQ] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newItem, setNewItem] = useState({ title: "", category: "", price: "" });
  const [editItem, setEditItem] = useState<MenuItem | null>(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // ✅ Fetch menu items if logged in
  useEffect(() => {
    if (currentUser && currentUser.id) {
      fetchItems();
    }
  }, [currentUser]);

  const fetchItems = async () => {
    if (!currentUser || !currentUser.id) return;
    try {
      const res = await api.get(`/menu/restaurant/${currentUser.id}`);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/menu/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleAdd = async () => {
    try {
      await api.post("/menu", { ...newItem, restaurantId: currentUser.id });
      setNewItem({ title: "", category: "", price: "" });
      fetchItems();
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleEdit = async () => {
    if (!editItem) return;
    try {
      await api.put(`/menu/${editItem._id}`, editItem);
      setEditItem(null);
      fetchItems();
    } catch (err) {
      console.error("Failed to edit item:", err);
    }
  };

  if (!currentUser) {
    return <div className="p-6">Please log in to manage your menu.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Menu Manager</h2>

      {/* 🔍 Search + Add Form */}
      <div className="flex gap-3 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search menu..."
          className="border p-2 rounded w-1/3"
        />
        <input
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          placeholder="New item title"
          className="border p-2 rounded"
        />
        <input
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>

      {/* 📝 Edit Form (if editing) */}
      {editItem && (
        <div className="mb-6 border p-4 rounded bg-gray-100">
          <h3 className="font-semibold mb-2">Edit Item</h3>
          <input
            value={editItem.title}
            onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <input
            value={editItem.category}
            onChange={(e) =>
              setEditItem({ ...editItem, category: e.target.value })
            }
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            value={editItem.price}
            onChange={(e) =>
              setEditItem({ ...editItem, price: Number(e.target.value) })
            }
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditItem(null)}
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      {/* 📋 Menu List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items
          .filter((it) =>
            it.title.toLowerCase().includes(q.toLowerCase())
          )
          .map((it) => (
            <div key={it._id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-gray-600">
                {it.category} • ₹{it.price}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditItem(it)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(it._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
