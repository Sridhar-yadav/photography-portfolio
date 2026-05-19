import { motion } from 'framer-motion';

const StoryDetail = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <p className="text-accent uppercase tracking-widest text-sm mb-4">Lake Como, Italy</p>
        <h1 className="text-5xl md:text-7xl font-display mb-8">Isabella & Marco</h1>
        <p className="text-textSecondary max-w-2xl mx-auto leading-relaxed">
          A breathtaking three-day celebration on the shores of Lake Como. From a welcome dinner on a classic Riva boat to an emotional ceremony at Villa del Balbianello, every moment was steeped in elegance and timeless romance.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="aspect-[21/9] w-full bg-surface mb-24 overflow-hidden"
      >
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2940&auto=format&fit=crop" 
          alt="Hero Cover" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        {[
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2938&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2787&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop"
        ].map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full bg-surface inline-block overflow-hidden cursor-pointer"
          >
            <img src={img} alt="Gallery item" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryDetail;
