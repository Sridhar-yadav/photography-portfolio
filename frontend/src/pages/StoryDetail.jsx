import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioAPI } from '../services/api';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setIsLoading(true);
        const res = await portfolioAPI.getById(id);
        setStory(res.data);
      } catch (error) {
        console.error('Failed to fetch story detail', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen flex items-center justify-center bg-background text-textPrimary">
        <p className="text-textSecondary uppercase tracking-widest text-xs">Loading story details...</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen flex items-center justify-center bg-background text-textPrimary">
        <p className="text-textSecondary uppercase tracking-widest text-xs">Story not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <p className="text-accent uppercase tracking-widest text-sm mb-4">{story.location || story.category}</p>
        <h1 className="text-5xl md:text-7xl font-display mb-8">{story.title}</h1>
        <p className="text-textSecondary max-w-2xl mx-auto leading-relaxed">
          {story.description || 'No description available for this story.'}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="aspect-[21/9] w-full bg-surface mb-24 overflow-hidden"
      >
        <img 
          src={story.cover_image} 
          alt={story.title} 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        {story.gallery_images && story.gallery_images.length > 0 ? (
          story.gallery_images.map((item, i) => (
            <motion.div 
              key={item.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full bg-surface inline-block overflow-hidden cursor-pointer"
            >
              <img src={item.image} alt={`Gallery item ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))
        ) : (
          <div className="w-full text-center py-20 inline-block col-span-2">
            <p className="text-textSecondary uppercase tracking-widest text-xs">No gallery images uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
