import { motion } from 'framer-motion';

const stories = [
  { id: 1, title: "Isabella & Marco", category: "Lake Como, Italy", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2940&auto=format&fit=crop", size: "col-span-2 row-span-2" },
  { id: 2, title: "Sophia & James", category: "Pre-Wedding", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2787&auto=format&fit=crop", size: "col-span-1 row-span-1" },
  { id: 3, title: "Elena's Maternity", category: "Editorial", img: "https://images.unsplash.com/photo-1623091410901-00e2d268901f?q=80&w=2787&auto=format&fit=crop", size: "col-span-1 row-span-1" },
  { id: 4, title: "The Royal Gala", category: "Events", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2938&auto=format&fit=crop", size: "col-span-2 row-span-1" },
];

const FeaturedStories = () => {
  return (
    <section className="py-32 px-6 max-w-[90rem] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Curated Moments</p>
          <h2 className="text-5xl md:text-7xl font-display">Featured Stories</h2>
        </motion.div>
        
        <motion.a 
          href="/stories"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="group flex items-center gap-4 text-sm uppercase tracking-widest pb-2 border-b border-textPrimary/20 hover:border-textPrimary transition-colors"
        >
          View All Portfolios
          <span className="transform group-hover:translate-x-2 transition-transform">→</span>
        </motion.a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px]">
        {stories.map((story, i) => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`group relative overflow-hidden bg-surface ${story.size} block cursor-pointer`}
          >
            <img 
              src={story.img} 
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white/70 uppercase tracking-widest text-xs mb-2 font-medium">{story.category}</p>
              <h3 className="text-3xl font-display text-white">{story.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedStories;
