import { motion } from 'framer-motion';

const AboutPreview = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex-1 relative"
        >
          <div className="aspect-[3/4] w-full max-w-md mx-auto md:ml-0 bg-surface relative z-10 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=2787&auto=format&fit=crop" 
              alt="Studio Founder"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-textPrimary/10 z-0 hidden md:block"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-display mb-8">The Art of Storytelling</h2>
          <p className="text-textSecondary text-lg leading-relaxed mb-10">
            We believe that every love story is a masterpiece waiting to be captured. 
            Our approach blends editorial fashion with raw emotion, creating a visual 
            legacy that feels both intimate and grand. For over a decade, we have 
            traveled the globe, documenting the most exquisite moments of our clients' lives.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-12 border-t border-b border-textPrimary/10 py-8">
            <div>
              <p className="text-4xl font-display text-accent mb-2">10+</p>
              <p className="text-xs uppercase tracking-widest text-textSecondary">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-display text-accent mb-2">30+</p>
              <p className="text-xs uppercase tracking-widest text-textSecondary">Countries Visited</p>
            </div>
          </div>

          <a href="/about" className="inline-block border-b border-textPrimary pb-1 uppercase tracking-widest text-sm hover:text-accent hover:border-accent transition-colors">
            Meet the team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
