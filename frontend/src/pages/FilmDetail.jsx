import { motion } from 'framer-motion';

const FilmDetail = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-20 px-6">
      <div className="max-w-[90rem] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <p className="text-accent uppercase tracking-widest text-sm mb-4">Destination Wedding</p>
          <h1 className="text-5xl md:text-7xl font-display mb-8">A Tuscan Dream</h1>
        </motion.div>

        {/* Video Player Placeholder */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full aspect-video bg-surface/10 relative overflow-hidden mb-16"
        >
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop" 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-24 h-24 rounded-full border-2 border-white/30 backdrop-blur-md flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-500 group">
              <span className="ml-2 text-white group-hover:text-black transition-colors text-2xl">▶</span>
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-white/70 text-lg leading-relaxed mb-12">
            Nestled in the rolling hills of Val d'Orcia, this wedding was a true cinematic masterpiece. 
            We focused on the interplay of golden hour light and the raw, emotional vows shared between the couple.
          </p>
          <a href="/contact" className="inline-block px-10 py-4 border border-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm">
            Inquire for Cinematography
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FilmDetail;
