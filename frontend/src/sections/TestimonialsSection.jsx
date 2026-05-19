import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonialsAPI } from '../services/api';

const fallbackTestimonials = [
  {
    name: "Alex & Sarah",
    text: "The studio didn't just take pictures; they captured the very essence of our love. Every time we look at our album, we are transported back to that magical day. Truly a cinematic masterpiece.",
    location: "Amalfi Coast, Italy"
  }
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsAPI.getAll();
        if (response.data && response.data.length > 0) {
          const apiTestimonials = response.data.map(item => ({
            name: item.client_name,
            text: item.review,
            location: "Worldwide Client" // Fallback since model doesn't have location
          }));
          setTestimonials(apiTestimonials);
        }
      } catch (error) {
        console.error("Using fallback testimonials. DB might not be connected.");
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-textPrimary text-background">
      {/* Background elegant pattern or subtle texture could go here */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')" }}></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-accent text-6xl font-display leading-none">"</span>
          <p className="text-2xl md:text-4xl font-display leading-relaxed my-8 font-light italic">
            {testimonials[0].text}
          </p>
          <div className="mt-12">
            <p className="uppercase tracking-[0.2em] text-sm font-medium">{testimonials[0].name}</p>
            <p className="text-background/60 text-xs tracking-widest uppercase mt-2">{testimonials[0].location}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
