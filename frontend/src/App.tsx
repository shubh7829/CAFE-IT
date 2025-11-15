import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Booking from "./pages/Bookings";
import Calculator from "./pages/Calculator";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/dashboard";
import MenuManager from "./pages/MenuManager";
import About from "./pages/About";
import EventPage from "./pages/eventpage";
import ParkingSlotPage from "./pages/parkingslot";
import RealtimeTrackingPage from "./pages/realtime";
import ForgotPasswordPage from "./pages/forgot-password";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/Index" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/Login" element={<Login />} />     
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu-manager" element={<MenuManager />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/parking" element={<ParkingSlotPage />} />
          <Route path="/tracking" element={<RealtimeTrackingPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Index />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
