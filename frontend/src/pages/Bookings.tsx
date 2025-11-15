
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, UtensilsCrossed, Coffee, Info } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type RestaurantType = "cafe" | "fine-dining" | "casual" | "fast-casual";

interface Restaurant {
  id: string;
  name: string;
  type: RestaurantType;
  image: string;
  rating: number;
  address: string;
}

// Sample restaurant data
const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Brew 13",
    type: "cafe",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/25/c4/34/brew13.jpg?w=900&h=500&s=1",
    rating: 4.7,
    address: "A-6 Rajpath Society Old Padra Road, Vadodara 390020 India"
  },
  {
    id: "r2",
    name: "Elegant Plate",
    type: "fine-dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    address: "456 Gourmet Ave, Culinary Heights"
  },
  {
    id: "r3",
    name: "Urban Bites",
    type: "casual",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    address: "789 Flavor St, Taste Valley"
  },
  {
    id: "r4",
    name: "Quick & Fresh",
    type: "fast-casual",
    image: "https://images.unsplash.com/photo-1586999768265-24af89630739?q=80&w=1000&auto=format&fit=crop",
    rating: 4.3,
    address: "321 Express Ln, Fast Town"
  },
  {
    id: "r5",
    name: "The Roasted Bean",
    type: "cafe",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    address: "567 Arabica Rd, Bean City"
  },
  {
    id: "r6",
    name: "Bistro Delight",
    type: "casual",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    rating: 4.4,
    address: "890 Casual Blvd, Comfort Zone"
  },
];

const Bookings = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("12:00");
  const [guests, setGuests] = useState<number>(2);
  const [type, setType] = useState<RestaurantType | "all">("all");
  const [step, setStep] = useState<1 | 2>(1);

  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const filteredRestaurants = type === "all" 
    ? restaurants 
    : restaurants.filter(r => r.type === type);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setStep(2);
    
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReservation = () => {
    if (!selectedRestaurant || !date || !time) {
      toast.error("Please complete all booking details");
      return;
    }

    // In a real app, this would be an API call
    toast.success(`Booking confirmed at ${selectedRestaurant.name} for ${guests} guests on ${format(date, 'PPP')} at ${time}`, {
      description: "You will receive a confirmation email shortly.",
      action: {
        label: "View",
        onClick: () => console.log("Viewed booking details"),
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-cafeit-beige-900 mb-4">
              Restaurant Bookings
            </h1>
            <p className="text-cafeit-beige-700 max-w-2xl mx-auto">
              Reserve tables at your favorite restaurants with our seamless booking system.
            </p>
          </div>

          {step === 1 ? (
            <>
              {/* Restaurant Filters */}
              <div className="mb-8">
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-4">
                  <button 
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      type === "all" 
                        ? "bg-cafeit-accent-terracotta text-white" 
                        : "bg-cafeit-beige-100 text-cafeit-beige-900 hover:bg-cafeit-beige-200"
                    )}
                    onClick={() => setType("all")}
                  >
                    All Restaurants
                  </button>
                  <button 
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      type === "cafe" 
                        ? "bg-cafeit-accent-terracotta text-white" 
                        : "bg-cafeit-beige-100 text-cafeit-beige-900 hover:bg-cafeit-beige-200"
                    )}
                    onClick={() => setType("cafe")}
                  >
                    <Coffee className="w-4 h-4 inline mr-1" />
                    Cafés
                  </button>
                  <button 
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      type === "fine-dining" 
                        ? "bg-cafeit-accent-terracotta text-white" 
                        : "bg-cafeit-beige-100 text-cafeit-beige-900 hover:bg-cafeit-beige-200"
                    )}
                    onClick={() => setType("fine-dining")}
                  >
                    <UtensilsCrossed className="w-4 h-4 inline mr-1" />
                    Fine Dining
                  </button>
                  <button 
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      type === "casual" 
                        ? "bg-cafeit-accent-terracotta text-white" 
                        : "bg-cafeit-beige-100 text-cafeit-beige-900 hover:bg-cafeit-beige-200"
                    )}
                    onClick={() => setType("casual")}
                  >
                    Casual Dining
                  </button>
                  <button 
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      type === "fast-casual" 
                        ? "bg-cafeit-accent-terracotta text-white" 
                        : "bg-cafeit-beige-100 text-cafeit-beige-900 hover:bg-cafeit-beige-200"
                    )}
                    onClick={() => setType("fast-casual")}
                  >
                    Fast Casual
                  </button>
                </div>
              </div>

              {/* Restaurant Listings */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRestaurants.map((restaurant) => (
                  <div 
                    key={restaurant.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-serif font-bold text-cafeit-beige-900">
                          {restaurant.name}
                        </h3>
                        <span className="inline-flex items-center bg-cafeit-beige-100 px-2 py-1 rounded-full text-sm font-medium text-cafeit-beige-900">
                          {restaurant.rating} ★
                        </span>
                      </div>
                      <p className="text-cafeit-beige-700 mb-4">{restaurant.address}</p>
                      <button
                        onClick={() => handleRestaurantSelect(restaurant)}
                        className="w-full py-2 bg-cafeit-accent-terracotta text-white rounded-lg font-medium transition-colors hover:bg-cafeit-accent-terracotta/90"
                      >
                        Reserve a Table
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Booking Form */}
              <div className="max-w-4xl mx-auto">
                <button 
                  className="mb-6 text-cafeit-accent-terracotta font-medium flex items-center"
                  onClick={() => setStep(1)}
                >
                  ← Back to Restaurants
                </button>

                {selectedRestaurant && (
                  <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                    <div className="h-64 overflow-hidden relative">
                      <img 
                        src={selectedRestaurant.image} 
                        alt={selectedRestaurant.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                          {selectedRestaurant.name}
                        </h2>
                        <p className="text-white/90">{selectedRestaurant.address}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-4">
                        Reservation Details
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date Selector */}
                        <div>
                          <label className="block text-cafeit-beige-800 font-medium mb-2">
                            <CalendarIcon className="w-4 h-4 inline mr-2" />
                            Date
                          </label>
                          <div className="bg-white border border-cafeit-beige-200 rounded-lg p-4">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date()}
                              className="pointer-events-auto"
                            />
                          </div>
                        </div>

                        {/* Time and Guests */}
                        <div className="space-y-6">
                          <div>
                            <label className="block text-cafeit-beige-800 font-medium mb-2">
                              <Clock className="w-4 h-4 inline mr-2" />
                              Time
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {timeSlots.slice(0, 12).map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setTime(slot)}
                                  className={cn(
                                    "py-2 text-sm rounded-md transition-colors",
                                    time === slot
                                      ? "bg-cafeit-accent-terracotta text-white"
                                      : "bg-cafeit-beige-100 text-cafeit-beige-900 hover:bg-cafeit-beige-200"
                                  )}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-cafeit-beige-800 font-medium mb-2">
                              <Users className="w-4 h-4 inline mr-2" />
                              Number of Guests
                            </label>
                            <div className="flex items-center border border-cafeit-beige-200 rounded-lg overflow-hidden">
                              <button
                                type="button"
                                disabled={guests <= 1}
                                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                                className="px-4 py-2 bg-cafeit-beige-100 text-cafeit-beige-900 disabled:opacity-50"
                              >
                                -
                              </button>
                              <div className="flex-1 text-center py-2">
                                {guests} {guests === 1 ? 'guest' : 'guests'}
                              </div>
                              <button
                                type="button"
                                disabled={guests >= 20}
                                onClick={() => setGuests((prev) => Math.min(20, prev + 1))}
                                className="px-4 py-2 bg-cafeit-beige-100 text-cafeit-beige-900 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="p-4 bg-cafeit-beige-50 rounded-lg mb-6 flex items-start">
                              <Info className="w-5 h-5 text-cafeit-accent-terracotta shrink-0 mt-0.5 mr-3" />
                              <p className="text-sm text-cafeit-beige-800">
                                Bookings require a minimum of 2 hours notice. For special requests, please contact the restaurant directly.
                              </p>
                            </div>
                            
                            <button
                              onClick={handleReservation}
                              className="w-full py-3 bg-cafeit-accent-terracotta text-white rounded-lg font-medium transition-all hover:bg-cafeit-accent-terracotta/90 hover:shadow-md"
                            >
                              Confirm Reservation
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bookings;
