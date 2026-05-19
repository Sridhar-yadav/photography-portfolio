import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-[3/4] w-full max-w-lg mx-auto bg-surface overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=2787&auto=format&fit=crop" 
            alt="The Team" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-display mb-8">The Artists Behind the Lens</h1>
          <p className="text-textSecondary text-lg leading-relaxed mb-8">
            Studio is an internationally recognized photography and cinematography house dedicated to the art of luxury storytelling. 
            Founded in 2012, we set out to redefine wedding documentation by blending editorial fashion photography with raw, photojournalistic emotion.
          </p>
          <p className="text-textSecondary text-lg leading-relaxed mb-12">
            Our approach is deeply personal. We believe your memories deserve to be preserved not just as images, but as cinematic heirlooms that will be cherished for generations. 
            Based in New York, we travel the world to capture the most exquisite celebrations.
          </p>
          
          <div className="grid grid-cols-3 gap-8 border-t border-b border-textPrimary/10 py-8">
            <div>
              <p className="text-4xl font-display text-accent mb-2">10+</p>
              <p className="text-xs uppercase tracking-widest text-textSecondary">Years Experience</p>
            </div>
            <div>
              <p className="text-4xl font-display text-accent mb-2">30+</p>
              <p className="text-xs uppercase tracking-widest text-textSecondary">Countries Visited</p>
            </div>
            <div>
              <p className="text-4xl font-display text-accent mb-2">500+</p>
              <p className="text-xs uppercase tracking-widest text-textSecondary">Stories Told</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
