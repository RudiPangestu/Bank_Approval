import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  position: string;
  image: string;
  rating: number;
  quote: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      position: "Small Business Owner",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      quote: "SecureBank's business loan helped me expand my boutique. Their personalized service and competitive rates made the whole process smooth and straightforward."
    },
    {
      name: "Michael Chen",
      position: "Software Engineer",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      quote: "The mortgage process with SecureBank was remarkably easy. The team guided me through every step, and I was able to secure a great rate for my first home."
    },
    {
      name: "Olivia Martinez",
      position: "Financial Analyst",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4,
      quote: "As someone who works in finance, I appreciate SecureBank's transparent approach and innovative digital banking tools. Their investment options have performed exceptionally well."
    },
    {
      name: "David Thompson",
      position: "Retired Teacher",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      quote: "SecureBank's retirement planning services have given me peace of mind. Their advisors took the time to understand my goals and created a personalized plan that works."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section bg-navy-800 text-white">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Customers Say</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with SecureBank.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div className="transition-all duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    className="min-w-full px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-navy-700 rounded-xl p-8 shadow-xl">
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-gold-500"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                          <p className="text-gray-300">{testimonial.position}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-gold-500 fill-gold-500' : 'text-gray-400'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-200 text-lg italic">"{testimonial.quote}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-navy-600 hover:bg-navy-700 rounded-full p-2 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-navy-600 hover:bg-navy-700 rounded-full p-2 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  activeIndex === index ? 'w-8 bg-gold-500' : 'w-2 bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;