// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// interface Order {
//   id: string;
//   status: string;
//   eta: string;
//   location: { lat: number; lng: number };
// }

// export default function RealtimeTrackingPage(): JSX.Element {
//   const [order, setOrder] = useState<Order | null>(null);

//   // Google Maps
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
//   });

//   useEffect(() => {
//     const orderId = "123"; // dynamic in real use

//     // Fetch initial order
//     axios.get(`http://localhost:5000/api/order/${orderId}`)
//       .then((res) => setOrder(res.data));

//     // WebSocket connection
//     const ws = new WebSocket(`ws://localhost:5000`);

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setOrder(data);
//     };

//     return () => ws.close();
//   }, []);

//   return (
//     <main className="min-h-screen bg-[#fffaf6] text-gray-900 p-6 md:p-12">
//       <section className="max-w-6xl mx-auto text-center mb-12">
//         <h1 className="text-4xl font-extrabold text-amber-600">
//           Real-Time Tracking
//         </h1>
//         <p className="mt-3 text-gray-600">
//           Stay updated with live order status and location tracking.
//         </p>
//       </section>

//       {order && (
//         <>
//           {/* Order Info */}
//           <section className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mb-12">
//             <h2 className="text-xl font-bold">Status</h2>
//             <p className="mt-2">{order.status}</p>
//             <p className="mt-2 text-amber-600 font-semibold">ETA: {order.eta}</p>
//           </section>

//           {/* Map */}
//           <section className="max-w-6xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Live Location</h2>
//             <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
//               {isLoaded ? (
//                 <GoogleMap
//                   zoom={14}
//                   center={order.location}
//                   mapContainerStyle={{ width: "100%", height: "100%" }}
//                 >
//                   <Marker position={order.location} />
//                 </GoogleMap>
//               ) : (
//                 <p>Loading map...</p>
//               )}
//             </div>
//           </section>
//         </>
//       )}
//     </main>
//   );
// }
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// interface Order {
//   id: string;
//   status: string;
//   eta: string;
//   location: { lat: number; lng: number };
// }

// export default function RealtimeTrackingPage(): JSX.Element {
//   const [order, setOrder] = useState<Order | null>(null);

//   // Google Maps
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
//   });

//   useEffect(() => {
//     const orderId = "123"; // dynamic in real use

//     // Fetch initial order
//     axios.get(`http://localhost:5000/api/order/${orderId}`)
//       .then((res) => setOrder(res.data));

//     // WebSocket connection
//     const ws = new WebSocket(`ws://localhost:5000`);

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setOrder(data);
//     };

//     return () => ws.close();
//   }, []);

//   return (
//     <main className="min-h-screen bg-[#fffaf6] text-gray-900 p-6 md:p-12">
//       <section className="max-w-6xl mx-auto text-center mb-12">
//         <h1 className="text-4xl font-extrabold text-amber-600">
//           Real-Time Tracking
//         </h1>
//         <p className="mt-3 text-gray-600">
//           Stay updated with live order status and location tracking.
//         </p>
//       </section>

//       {order && (
//         <>
//           {/* Order Info */}
//           <section className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mb-12">
//             <h2 className="text-xl font-bold">Status</h2>
//             <p className="mt-2">{order.status}</p>
//             <p className="mt-2 text-amber-600 font-semibold">ETA: {order.eta}</p>
//           </section>

//           {/* Map */}
//           <section className="max-w-6xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Live Location</h2>
//             <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
//               {isLoaded ? (
//                 <GoogleMap
//                   zoom={14}
//                   center={order.location}
//                   mapContainerStyle={{ width: "100%", height: "100%" }}
//                 >
//                   <Marker position={order.location} />
//                 </GoogleMap>
//               ) : (
//                 <p>Loading map...</p>
//               )}
//             </div>
//           </section>
//         </>
//       )}
//     </main>
//   );
// }

import React, { useState, useEffect } from "react";
import { MapPin, Clock, Truck, Coffee, RefreshCcw } from "lucide-react";

export default function RealtimeTrackingPage(): JSX.Element {
  const [eta, setEta] = useState("12 mins");
  const [status, setStatus] = useState("Your order is being prepared");
  const [progress, setProgress] = useState(30);

  // Fake update simulation (replace with WebSocket or API in real use)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
      if (progress >= 70) {
        setStatus("Your order is on the way 🚴‍♂️");
        setEta("5 mins");
      }
      if (progress === 100) {
        setStatus("Order Delivered ✅");
        setEta("0 mins");
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <main className="min-h-screen bg-[#fdfdfb] text-gray-900 p-6 md:p-12">
      {/* Header */}
      <section className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-amber-600">
          Real-Time Order Tracking
        </h1>
        <p className="mt-3 text-gray-600">
          Stay updated with live status, estimated arrival time, and map view of your order.
        </p>
      </section>

      {/* Order Status */}
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Current Status</h2>
          <p className="text-gray-700">{status}</p>
          <div className="mt-4 flex items-center gap-2 text-amber-600 font-semibold">
            <Clock size={20} /> ETA: {eta}
          </div>

          <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-amber-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <Coffee size={40} className="text-amber-600" />
          <Truck size={40} className="text-amber-600" />
          <MapPin size={40} className="text-amber-600" />
        </div>
      </section>

      {/* Live Map Simulation */}
      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Live Location</h2>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Live Map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Cafe`}
          ></iframe>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold">Why Customers Love Realtime Tracking</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <Clock className="text-amber-600" size={24} />,
              title: "Live ETA Updates",
              desc: "Know exactly when your order will arrive."
            },
            {
              icon: <Truck className="text-amber-600" size={24} />,
              title: "Driver Tracking",
              desc: "Follow your delivery in real time on the map."
            },
            {
              icon: <RefreshCcw className="text-amber-600" size={24} />,
              title: "Auto Refresh",
              desc: "No need to reload — updates are seamless."
            },
            {
              icon: <Coffee className="text-amber-600" size={24} />,
              title: "Order Transparency",
              desc: "Track from preparation to doorstep delivery."
            }
          ].map((f) => (
            <div key={f.title} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="mb-2">{f.icon}</div>
              <h4 className="font-semibold">{f.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
