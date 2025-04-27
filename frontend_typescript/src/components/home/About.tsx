import React from 'react';
import { CheckCircle, TrendingUp, Lock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-gold-500" />,
      title: "Growth-Focused",
      description: "We're committed to helping our customers grow their wealth and achieve financial success."
    },
    {
      icon: <Lock className="h-6 w-6 text-gold-500" />,
      title: "Secure Banking",
      description: "Advanced security measures to protect your financial information and transactions."
    },
    {
      icon: <Users className="h-6 w-6 text-gold-500" />,
      title: "Community-Oriented",
      description: "We invest in local communities and support initiatives that drive positive change."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-gold-500" />,
      title: "Customer Excellence",
      description: "Dedicated to providing exceptional service and personalized financial solutions."
    }
  ];

  return (
    <section id="about" className="section bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-500 opacity-20 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-navy-500 opacity-20 rounded-lg"></div>
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team of banking professionals" 
                className="rounded-lg shadow-lg relative z-10 object-cover w-full h-[500px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About SecureBank</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2010, SecureBank has grown to become a leading financial institution committed to providing innovative banking solutions that help our customers achieve their financial goals.
            </p>
            <p className="text-gray-600 mb-8">
              Our mission is to empower individuals and businesses with the financial tools, knowledge, and support they need to thrive in today's dynamic economy while maintaining the highest standards of security and customer service.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Our Story in Numbers</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-800">15+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-800">25+</div>
                  <div className="text-gray-600">Branch Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-800">100k+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-800">$5B+</div>
                  <div className="text-gray-600">Assets Managed</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;