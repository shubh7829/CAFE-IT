import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Calculator from './Calculator';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Services Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-cafeit-beige-900 mb-4">
              Our Services
            </h1>
            <p className="text-cafeit-beige-700 max-w-2xl mx-auto">
              Explore our range of services and calculate costs for your specific needs.
            </p>
          </div>

          {/* Services Content */}
          <div className="grid grid-cols-1 gap-8 mb-16">
            {/* Cost Calculator Section */}
            <section>
              <Calculator />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services; 