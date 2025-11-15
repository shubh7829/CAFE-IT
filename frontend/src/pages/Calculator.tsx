
import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, CoffeeIcon, Car, Calendar, Users, Clock, Equal } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

type ServiceType = 'restaurant' | 'event' | 'parking';

interface CalculatorFormState {
  serviceType: ServiceType;
  guests: number;
  hours: number;
  premium: boolean;
  date: Date | null;
  hasParking: boolean;
  parkingHours: number;
}

interface ServiceRate {
  baseRate: number;
  perPersonRate: number;
  hourlyRate: number;
  premiumMultiplier: number;
  weekendMultiplier: number;
}

const serviceRates: Record<ServiceType, ServiceRate> = {
  restaurant: {
    baseRate: 20,
    perPersonRate: 15,
    hourlyRate: 0, // Restaurants typically don't charge by hour
    premiumMultiplier: 1.5,
    weekendMultiplier: 1.2
  },
  event: {
    baseRate: 100,
    perPersonRate: 25,
    hourlyRate: 50,
    premiumMultiplier: 1.75,
    weekendMultiplier: 1.35
  },
  parking: {
    baseRate: 5,
    perPersonRate: 0, // Parking doesn't charge by person
    hourlyRate: 3,
    premiumMultiplier: 1.8,
    weekendMultiplier: 1.25
  }
};

const initialState: CalculatorFormState = {
  serviceType: 'restaurant',
  guests: 2,
  hours: 2,
  premium: false,
  date: new Date(),
  hasParking: false,
  parkingHours: 3
};

const Calculator = () => {
  const [formState, setFormState] = useState<CalculatorFormState>(initialState);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<{label: string, amount: number}[]>([]);

  const calculateCost = () => {
    const { serviceType, guests, hours, premium, date, hasParking, parkingHours } = formState;
    const rates = serviceRates[serviceType];
    
    let cost = rates.baseRate;
    const breakdownItems: {label: string, amount: number}[] = [
      { label: 'Base rate', amount: rates.baseRate }
    ];
    
    // Per person cost
    if (rates.perPersonRate > 0) {
      const perPersonCost = rates.perPersonRate * guests;
      cost += perPersonCost;
      breakdownItems.push({ label: `Per person rate (${guests} guests)`, amount: perPersonCost });
    }
    
    // Hourly cost
    if (rates.hourlyRate > 0) {
      const hourlyCost = rates.hourlyRate * hours;
      cost += hourlyCost;
      breakdownItems.push({ label: `Hourly rate (${hours} hours)`, amount: hourlyCost });
    }
    
    // Weekend multiplier
    if (date && (date.getDay() === 0 || date.getDay() === 6)) {
      const baseCost = cost;
      const weekendSurcharge = baseCost * (rates.weekendMultiplier - 1);
      cost = baseCost * rates.weekendMultiplier;
      breakdownItems.push({ label: 'Weekend surcharge', amount: weekendSurcharge });
    }
    
    // Premium service
    if (premium) {
      const baseCost = cost;
      const premiumSurcharge = baseCost * (rates.premiumMultiplier - 1);
      cost = baseCost * rates.premiumMultiplier;
      breakdownItems.push({ label: 'Premium service', amount: premiumSurcharge });
    }
    
    // Additional parking cost
    if (hasParking && serviceType !== 'parking') {
      const parkingRates = serviceRates.parking;
      const parkingCost = parkingRates.baseRate + (parkingRates.hourlyRate * parkingHours);
      cost += parkingCost;
      breakdownItems.push({ label: `Parking (${parkingHours} hours)`, amount: parkingCost });
    }
    
    setTotalCost(cost);
    setBreakdown(breakdownItems);
  };

  // Recalculate whenever form values change
  useEffect(() => {
    calculateCost();
  }, [formState]);

  const handleInputChange = (field: keyof CalculatorFormState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-cafeit-beige-900 mb-4">
              Cost Calculator
            </h1>
            <p className="text-cafeit-beige-700 max-w-2xl mx-auto">
              Estimate your dining, event, or parking costs with our comprehensive calculator.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-3/5 p-6 md:p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-xl font-serif font-bold text-cafeit-beige-900 mb-4 flex items-center">
                    <CalculatorIcon className="mr-2 h-5 w-5 text-cafeit-accent-terracotta" />
                    Select Service Type
                  </h2>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
                        formState.serviceType === 'restaurant'
                          ? "border-cafeit-accent-terracotta bg-cafeit-beige-50"
                          : "border-cafeit-beige-200 hover:border-cafeit-beige-300"
                      )}
                      onClick={() => handleInputChange('serviceType', 'restaurant')}
                    >
                      <CoffeeIcon className={cn(
                        "h-8 w-8 mb-2",
                        formState.serviceType === 'restaurant' ? "text-cafeit-accent-terracotta" : "text-cafeit-beige-500"
                      )} />
                      <span className={cn(
                        "font-medium",
                        formState.serviceType === 'restaurant' ? "text-cafeit-accent-terracotta" : "text-cafeit-beige-700"
                      )}>Restaurant</span>
                    </button>
                    
                    <button
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
                        formState.serviceType === 'event'
                          ? "border-cafeit-accent-terracotta bg-cafeit-beige-50"
                          : "border-cafeit-beige-200 hover:border-cafeit-beige-300"
                      )}
                      onClick={() => handleInputChange('serviceType', 'event')}
                    >
                      <Calendar className={cn(
                        "h-8 w-8 mb-2",
                        formState.serviceType === 'event' ? "text-cafeit-accent-terracotta" : "text-cafeit-beige-500"
                      )} />
                      <span className={cn(
                        "font-medium",
                        formState.serviceType === 'event' ? "text-cafeit-accent-terracotta" : "text-cafeit-beige-700"
                      )}>Event</span>
                    </button>
                    
                    <button
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
                        formState.serviceType === 'parking'
                          ? "border-cafeit-accent-terracotta bg-cafeit-beige-50"
                          : "border-cafeit-beige-200 hover:border-cafeit-beige-300"
                      )}
                      onClick={() => handleInputChange('serviceType', 'parking')}
                    >
                      <Car className={cn(
                        "h-8 w-8 mb-2",
                        formState.serviceType === 'parking' ? "text-cafeit-accent-terracotta" : "text-cafeit-beige-500"
                      )} />
                      <span className={cn(
                        "font-medium",
                        formState.serviceType === 'parking' ? "text-cafeit-accent-terracotta" : "text-cafeit-beige-700"
                      )}>Parking</span>
                    </button>
                  </div>
                </div>

                {/* Guests Input - Only show for restaurant and event */}
                {(formState.serviceType === 'restaurant' || formState.serviceType === 'event') && (
                  <div className="mb-6">
                    <label className="block text-cafeit-beige-800 font-medium mb-2 flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Number of Guests
                    </label>
                    <div className="flex items-center border border-cafeit-beige-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        disabled={formState.guests <= 1}
                        onClick={() => handleInputChange('guests', Math.max(1, formState.guests - 1))}
                        className="px-4 py-2 bg-cafeit-beige-100 text-cafeit-beige-900 disabled:opacity-50"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center py-2">
                        {formState.guests} {formState.guests === 1 ? 'guest' : 'guests'}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInputChange('guests', formState.guests + 1)}
                        className="px-4 py-2 bg-cafeit-beige-100 text-cafeit-beige-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Hours Input - Only show for event and parking */}
                {(formState.serviceType === 'event' || formState.serviceType === 'parking') && (
                  <div className="mb-6">
                    <label className="block text-cafeit-beige-800 font-medium mb-2 flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Number of Hours
                    </label>
                    <div className="flex items-center border border-cafeit-beige-200 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        disabled={formState.hours <= 1}
                        onClick={() => handleInputChange('hours', Math.max(1, formState.hours - 1))}
                        className="px-4 py-2 bg-cafeit-beige-100 text-cafeit-beige-900 disabled:opacity-50"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center py-2">
                        {formState.hours} {formState.hours === 1 ? 'hour' : 'hours'}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInputChange('hours', formState.hours + 1)}
                        className="px-4 py-2 bg-cafeit-beige-100 text-cafeit-beige-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Weekend Toggle */}
                <div className="mb-6">
                  <label className="block text-cafeit-beige-800 font-medium mb-2">
                    Day Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={cn(
                        "flex items-center justify-center p-3 rounded-lg border transition-all",
                        formState.date && ![0, 6].includes(formState.date.getDay())
                          ? "border-cafeit-accent-terracotta bg-cafeit-beige-50"
                          : "border-cafeit-beige-200 hover:border-cafeit-beige-300"
                      )}
                      onClick={() => {
                        const weekday = new Date();
                        // Set to next Monday if today is weekend
                        if (weekday.getDay() === 0) weekday.setDate(weekday.getDate() + 1);
                        if (weekday.getDay() === 6) weekday.setDate(weekday.getDate() + 2);
                        handleInputChange('date', weekday);
                      }}
                    >
                      <span className="font-medium">Weekday</span>
                    </button>
                    <button
                      className={cn(
                        "flex items-center justify-center p-3 rounded-lg border transition-all",
                        formState.date && [0, 6].includes(formState.date.getDay())
                          ? "border-cafeit-accent-terracotta bg-cafeit-beige-50"
                          : "border-cafeit-beige-200 hover:border-cafeit-beige-300"
                      )}
                      onClick={() => {
                        const weekend = new Date();
                        // Set to next Saturday if not already weekend
                        if (weekend.getDay() !== 0 && weekend.getDay() !== 6) {
                          weekend.setDate(weekend.getDate() + (6 - weekend.getDay()));
                        }
                        handleInputChange('date', weekend);
                      }}
                    >
                      <span className="font-medium">Weekend</span>
                    </button>
                  </div>
                </div>

                {/* Premium Service Toggle */}
                <div className="mb-6">
                  <label className="block text-cafeit-beige-800 font-medium mb-2">
                    Service Level
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={cn(
                        "flex items-center justify-center p-3 rounded-lg border transition-all",
                        !formState.premium
                          ? "border-cafeit-accent-terracotta bg-cafeit-beige-50"
                          : "border-cafeit-beige-200 hover:border-cafeit-beige-300"
                      )}
                      onClick={() => handleInputChange('premium', false)}
                    >
                      <span className="font-medium">Standard</span>
                    </button>
                    <button
                      className={cn(
                        "flex items-center justify-center p-3 rounded-lg border transition-all",
                        formState.premium
                          ? "border-cafeit-accent-terracotta bg-cafeit-beige-50"
                          : "border-cafeit-beige-200 hover:border-cafeit-beige-300"
                      )}
                      onClick={() => handleInputChange('premium', true)}
                    >
                      <span className="font-medium">Premium</span>
                    </button>
                  </div>
                </div>

                {/* Parking Option - Only for non-parking services */}
                {formState.serviceType !== 'parking' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-cafeit-beige-800 font-medium flex items-center">
                        <Car className="mr-2 h-4 w-4" />
                        Include Parking
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formState.hasParking}
                          onChange={(e) => handleInputChange('hasParking', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-cafeit-beige-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cafeit-accent-terracotta"></div>
                      </label>
                    </div>
                    
                    {formState.hasParking && (
                      <div className="ml-6 mt-3">
                        <label className="block text-cafeit-beige-800 text-sm mb-1">
                          Parking Hours
                        </label>
                        <div className="flex items-center border border-cafeit-beige-200 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            disabled={formState.parkingHours <= 1}
                            onClick={() => handleInputChange('parkingHours', Math.max(1, formState.parkingHours - 1))}
                            className="px-3 py-1 bg-cafeit-beige-100 text-cafeit-beige-900 disabled:opacity-50"
                          >
                            -
                          </button>
                          <div className="flex-1 text-center py-1 text-sm">
                            {formState.parkingHours} {formState.parkingHours === 1 ? 'hour' : 'hours'}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleInputChange('parkingHours', formState.parkingHours + 1)}
                            className="px-3 py-1 bg-cafeit-beige-100 text-cafeit-beige-900"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Results Section */}
              <div className="md:w-2/5 bg-cafeit-beige-50 p-6 md:p-8 lg:p-10 border-t md:border-t-0 md:border-l border-cafeit-beige-200">
                <div className="flex items-center mb-6">
                  <Equal className="h-6 w-6 text-cafeit-accent-terracotta mr-3" />
                  <h2 className="text-xl font-serif font-bold text-cafeit-beige-900">
                    Your Estimate
                  </h2>
                </div>

                <div className="mb-6 pb-6 border-b border-cafeit-beige-200">
                  <div className="flex justify-between items-center">
                    <span className="text-cafeit-beige-800">Total Estimated Cost</span>
                    <span className="text-3xl font-bold text-cafeit-beige-900">{formatCurrency(totalCost)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-cafeit-beige-900">Cost Breakdown</h3>
                  
                  {breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-cafeit-beige-700">{item.label}</span>
                      <span className="text-sm font-medium text-cafeit-beige-900">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-cafeit-beige-200">
                  <div className="text-sm text-cafeit-beige-700 mb-6">
                    <p>This is an estimate only. Final costs may vary based on actual service details, additional requests, and other factors.</p>
                  </div>

                  <button
                    className="w-full py-3 bg-cafeit-accent-terracotta text-white rounded-lg font-medium transition-all hover:bg-cafeit-accent-terracotta/90 hover:shadow-md"
                  >
                    Continue to Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;
