import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const films = [
  { id: 1, title: "A Tuscan Dream", category: "Destination Wedding", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop" },
  { id: 2, title: "City Lights & Love", category: "Engagement Film", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2940&auto=format&fit=crop" },
];

const FilmsSection = () => {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display mb-6"
          >
            Cinematic Films
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 uppercase tracking-widest text-sm max-w-xl mx-auto"
          >
            Experience the emotion and grandeur of your special day through our signature filmmaking approach.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16">
          {films.map((film, i) => (
            <motion.div 
              key={film.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full aspect-video md:aspect-[21/9] bg-surface/10 group cursor-pointer overflow-hidden"
            >
              <img 
                src={film.img} 
                alt={film.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                  <Play className="ml-2 text-white group-hover:text-black transition-colors" size={24} />
                </div>
              </div>

              <div className="absolute bottom-10 left-10 text-left">
                <p className="text-accent uppercase tracking-widest text-sm mb-3">{film.category}</p>
                <h3 className="text-4xl md:text-5xl font-display text-white">{film.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <a href="/films" className="inline-block px-10 py-4 border border-white/30 hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm">
            Discover All Films
          </a>
        </div>
      </div>
    </section>
  );
};

export default FilmsSection;
