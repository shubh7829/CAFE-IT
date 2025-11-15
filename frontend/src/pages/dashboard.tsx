import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  Coffee,
  Users,
  Store,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  Receipt,
  User,
  Utensils,
  CreditCard,
  Activity,
  Search,
  Bell,
  LogOut,
} from "lucide-react";

// ----------------------------
// Reusable UI primitives (tailwind-only)
// ----------------------------
const Card = ({ className = "", children }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`rounded-2xl bg-white shadow-sm border border-gray-100 ${className}`}>{children}</div>
);
const CardHeader = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
    <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      {icon}
      {title}
    </h3>
  </div>
);
const CardBody = ({ className = "", children }: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`px-5 py-4 ${className}`}>{children}</div>
);

// ----------------------------
// Types
// ----------------------------

type Role = "user" | "restaurant";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface OrderRow {
  id: string;
  customer: string;
  item: string;
  amount: number;
  status: "Pending" | "Preparing" | "Completed" | "Cancelled";
  time: string;
}

interface TxnRow {
  id: string;
  type: "Order" | "Refund" | "Payout";
  method: "UPI" | "Card" | "Cash";
  amount: number;
  at: string; // ISO date
}

// Color palette for charts
const PIE_COLORS = ["#f59e0b", "#6b7280", "#ef4444", "#10b981", "#3b82f6", "#a855f7"];

// ----------------------------
// Mock data (replace with API responses)
// ----------------------------
const weeklyRevenue = [
  { day: "Mon", revenue: 9800, orders: 124 },
  { day: "Tue", revenue: 11200, orders: 136 },
  { day: "Wed", revenue: 10900, orders: 142 },
  { day: "Thu", revenue: 8600, orders: 118 },
  { day: "Fri", revenue: 12700, orders: 168 },
  { day: "Sat", revenue: 16150, orders: 194 },
  { day: "Sun", revenue: 12100, orders: 150 },
];

const orderTypes = [
  { type: "Dine-in", count: 420 },
  { type: "Takeaway", count: 310 },
  { type: "Delivery", count: 560 },
  { type: "Reservations", count: 120 },
];

const adImpressions = [
  { name: "Instagram", value: 5400 },
  { name: "Facebook", value: 4200 },
  { name: "Maps", value: 2100 },
  { name: "Website", value: 3300 },
];

const sampleOrders: OrderRow[] = [
  { id: "#10291", customer: "Aarav S.", item: "Iced Latte", amount: 220, status: "Preparing", time: "2 mins ago" },
  { id: "#10290", customer: "Meera P.", item: "Masala Chai", amount: 120, status: "Completed", time: "10 mins ago" },
  { id: "#10289", customer: "Karan V.", item: "Paneer Wrap", amount: 260, status: "Pending", time: "15 mins ago" },
  { id: "#10288", customer: "Ria D.", item: "Brownie", amount: 150, status: "Completed", time: "22 mins ago" },
];

const sampleTxns: TxnRow[] = [
  { id: "TXN-88A1", type: "Order", method: "UPI", amount: 460, at: "2025-09-03T12:45:00" },
  { id: "TXN-88A0", type: "Payout", method: "Card", amount: -3200, at: "2025-09-03T11:30:00" },
  { id: "TXN-889F", type: "Refund", method: "Card", amount: -150, at: "2025-09-03T11:00:00" },
  { id: "TXN-889E", type: "Order", method: "Cash", amount: 230, at: "2025-09-03T10:05:00" },
];

// ----------------------------
// Main Component
// ----------------------------
export default function CafeItDashboard() {
  const [role, setRole] = useState<Role>(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const u: CurrentUser = JSON.parse(stored);
        return (u.role as Role) || "user";
      } catch {}
    }
    return "user";
  });
  const [liveUsers, setLiveUsers] = useState(86);

  // Fake live counter
  useEffect(() => {
    const id = setInterval(() => {
      setLiveUsers((n) => Math.max(12, Math.min(9999, n + (Math.random() > 0.5 ? 1 : -1))));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const totals = useMemo(() => {
    const activeUsers = 1080;
    const restaurants = 42;
    const newOrders = weeklyRevenue.reduce((a, b) => a + b.orders, 0);
    const revenue = weeklyRevenue.reduce((a, b) => a + b.revenue, 0);
    return { activeUsers, restaurants, newOrders, revenue };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Topbar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-amber-700" />
            <span className="font-semibold text-amber-900">CAFE'IT • Dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border">
              <Search className="h-4 w-4" />
              <input className="bg-transparent outline-none text-sm w-56" placeholder="Search orders, users..." />
            </div>
            <Bell className="h-5 w-5" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-100">
              <Activity className="h-4 w-4 text-amber-700" />
              <span className="text-xs text-amber-800">Live: {liveUsers}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Role Switcher */}
        <div className="mb-5 flex items-center gap-2">
          <span className="text-sm text-gray-600">Viewing as:</span>
          <div className="inline-flex rounded-xl border bg-white p-1">
            <button
              onClick={() => setRole("user")}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                role === "user" ? "bg-amber-600 text-white" : "text-gray-600"
              }`}
            >
              <User className="h-4 w-4" /> User
            </button>
            <button
              onClick={() => setRole("restaurant")}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${
                role === "restaurant" ? "bg-amber-600 text-white" : "text-gray-600"
              }`}
            >
              <Store className="h-4 w-4" /> Restaurant
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold text-gray-800">{totals.activeUsers}</p>
                  <span className="text-xs text-emerald-600">+20% this week</span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Restaurants</p>
                  <p className="text-2xl font-bold text-gray-800">{totals.restaurants}</p>
                  <span className="text-xs text-sky-600">+3 new today</span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Store className="h-5 w-5 text-sky-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Weekly Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{totals.newOrders}</p>
                  <span className="text-xs text-amber-600">+12% vs last week</span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Weekly Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">₹{(totals.revenue / 1000).toFixed(1)}k</p>
                  <span className="text-xs text-emerald-600 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> up trend</span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Revenue & Orders (this week)" icon={<Receipt className="h-4 w-4 text-amber-600" />} />
            <CardBody className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyRevenue} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="orders" name="Orders" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Order Types" icon={<Utensils className="h-4 w-4 text-rose-600" />} />
            <CardBody className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderTypes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Orders" fill="#a855f7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Impressions & Live Users */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader title="Marketing Impressions" icon={<TrendingUp className="h-4 w-4 text-emerald-600" />} />
            <CardBody className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie data={adImpressions} dataKey="value" nameKey="name" outerRadius={96} innerRadius={50}>
                    {adImpressions.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader title="Live Users (last 30 mins)" icon={<Activity className="h-4 w-4 text-sky-600" />} />
            <CardBody className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyRevenue.map((d, i) => ({ t: i, users: Math.round(d.orders * 0.6) + 40 }))}>
                  <defs>
                    <linearGradient id="live" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="t" tickFormatter={(n) => `${n * 5}m`} />
                  <YAxis />
                  <Tooltip labelFormatter={(n) => `${Number(n) * 5} mins`} />
                  <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="url(#live)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Recent Orders" icon={<Clock className="h-4 w-4 text-gray-500" />} />
            <CardBody className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2">Order ID</th>
                    <th className="py-2">Customer</th>
                    <th className="py-2">Item</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="py-3 font-medium">{o.id}</td>
                      <td className="py-3">{o.customer}</td>
                      <td className="py-3">{o.item}</td>
                      <td className="py-3">₹{o.amount}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            o.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : o.status === "Preparing"
                              ? "bg-amber-50 text-amber-700"
                              : o.status === "Pending"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{o.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Quick Actions" icon={<Coffee className="h-4 w-4 text-amber-600" />} />
            <CardBody className="grid grid-cols-2 gap-3">
              <ActionBtn icon={<Utensils className="h-4 w-4" />}>Add Menu Item</ActionBtn>
              <ActionBtn icon={<Users className="h-4 w-4" />}>Manage Staff</ActionBtn>
              <ActionBtn icon={<CreditCard className="h-4 w-4" />}>New Payout</ActionBtn>
              <ActionBtn icon={<Receipt className="h-4 w-4" />}>Export Report</ActionBtn>
              <ActionBtn icon={<LogOut className="h-4 w-4" />}>Logout</ActionBtn>
              <ActionBtn icon={<DollarSign className="h-4 w-4" />}>Offer Coupon</ActionBtn>
            </CardBody>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader title="Transaction History" icon={<CreditCard className="h-4 w-4 text-indigo-600" />} />
          <CardBody className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Txn ID</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Method</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {sampleTxns.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="py-3 font-medium">{t.id}</td>
                    <td className="py-3">{t.type}</td>
                    <td className="py-3">{t.method}</td>
                    <td className={`py-3 ${t.amount < 0 ? "text-rose-600" : "text-emerald-700"}`}>
                      {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
                    </td>
                    <td className="py-3 text-gray-500">{new Date(t.at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} CAFE'IT • Crafted with ☕
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon, children }: React.PropsWithChildren<{ icon: React.ReactNode }>) {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 hover:shadow-sm transition">
      <span className="text-gray-700">{icon}</span>
      <span className="text-sm text-gray-700">{children}</span>
    </button>
  );
}
