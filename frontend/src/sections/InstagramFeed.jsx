import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
];

const InstagramFeed = () => {
  return (
    <section className="py-20 px-6 max-w-[100rem] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-display mb-4">Follow Our Journey</h2>
          <p className="text-textSecondary uppercase tracking-widest text-sm">@studio.cinematic</p>
        </div>
        <a href="#" className="hidden md:inline-block border-b border-textPrimary pb-1 uppercase tracking-widest text-sm hover:text-accent hover:border-accent transition-colors">
          View Instagram
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
        {images.map((img, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative aspect-square overflow-hidden bg-surface"
          >
            <img 
              src={img} 
              alt="Instagram post" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white">❤️</span>
            </div>
          </motion.a>
        ))}
      </div>
      <a href="#" className="md:hidden mt-8 block text-center border-b border-textPrimary pb-1 uppercase tracking-widest text-sm w-max mx-auto">
        View Instagram
      </a>
    </section>
  );
};

export default InstagramFeed;
