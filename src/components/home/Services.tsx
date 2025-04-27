import React from 'react';
import { 
  CreditCard, 
  Building2, 
  DollarSign, 
  Landmark, 
  BanknoteIcon, 
  PiggyBank, 
  Smartphone,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="card hover:scale-105 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-navy-50 rounded-full text-navy-700 group-hover:bg-gold-50 group-hover:text-gold-500 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Personal Banking",
      description: "Comprehensive personal banking solutions including savings, checking, and investment accounts tailored to your needs."
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Business Banking",
      description: "Specialized banking services for businesses of all sizes, from startups to large corporations."
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Loans & Credit",
      description: "Flexible loan options with competitive interest rates for personal and business needs."
    },
    {
      icon: <Landmark className="h-8 w-8" />,
      title: "Mortgage Services",
      description: "Find your dream home with our range of mortgage options and expert advisory services."
    },
    {
      icon: <BanknoteIcon className="h-8 w-8" />,
      title: "Investment Banking",
      description: "Grow your wealth with our expert investment strategies and portfolio management services."
    },
    {
      icon: <PiggyBank className="h-8 w-8" />,
      title: "Retirement Planning",
      description: "Secure your future with our comprehensive retirement planning and pension services."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Digital Banking",
      description: "Access your accounts anytime, anywhere with our secure and user-friendly digital banking platform."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Insurance Services",
      description: "Protect what matters most with our comprehensive insurance solutions for life, health, and property."
    },
  ];

  return (
    <section id="services" className="section bg-white">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Banking Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a wide range of financial services to meet your personal and business needs with security, efficiency, and excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;