import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';

const fallbackStories = [
  { id: 1, title: "Isabella & Marco", category: "Weddings", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2940&auto=format&fit=crop", size: "aspect-[3/4]" },
  { id: 2, title: "Sophia & James", category: "Pre-Weddings", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2787&auto=format&fit=crop", size: "aspect-square" },
  { id: 3, title: "Elena's Story", category: "Maternity", img: "https://images.unsplash.com/photo-1623091410901-00e2d268901f?q=80&w=2787&auto=format&fit=crop", size: "aspect-[4/3]" },
  { id: 4, title: "The Royal Gala", category: "Events", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2938&auto=format&fit=crop", size: "aspect-[3/4]" },
  { id: 5, title: "Mia's First", category: "Birthdays", img: "https://images.unsplash.com/photo-1530103862676-de8892bf984d?q=80&w=2940&auto=format&fit=crop", size: "aspect-[4/3]" },
  { id: 6, title: "A Tuscan Dream", category: "Weddings", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop", size: "aspect-square" },
];

const categories = ["All", "Weddings", "Pre-Weddings", "Events", "Maternity", "Birthdays"];

const Stories = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [stories, setStories] = useState(fallbackStories);
  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await portfolioAPI.getAll();
        if (response.data && response.data.length > 0) {
          const apiStories = response.data.map((item, index) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            img: item.cover_image,
            size: fallbackStories[index % fallbackStories.length].size // Keep dynamic masonry size
          }));
          setStories(apiStories);
        }
      } catch (error) {
        console.error("Using fallback stories. DB might not be connected.");
      }
    };
    fetchStories();
  }, []);

  const filteredStories = activeCategory === "All" 
    ? stories 
    : stories.filter(story => story.category === activeCategory);

  return (
    <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display mb-6 tracking-tight">Stories</h1>
        <p className="text-textSecondary max-w-2xl mx-auto uppercase tracking-widest text-sm">
          A curated collection of timeless memories.
        </p>
      </motion.div>

      {/* Filter System */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex flex-wrap justify-center gap-6 mb-16"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 pb-1 border-b ${
              activeCategory === cat 
                ? 'border-textPrimary text-textPrimary' 
                : 'border-transparent text-textSecondary hover:text-textPrimary'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>
      
      {/* Masonry Layout */}
      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {filteredStories.map((story) => (
            <motion.div 
              key={story.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`group relative overflow-hidden bg-surface cursor-pointer w-full inline-block ${story.size}`}
            >
              <img 
                src={story.img} 
                alt={story.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <p className="text-white/70 uppercase tracking-widest text-xs mb-2">{story.category}</p>
                <h3 className="text-2xl font-display text-white">{story.title}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Stories;
