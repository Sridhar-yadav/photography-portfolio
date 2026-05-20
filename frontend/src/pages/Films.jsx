import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { filmsAPI } from '../services/api';

const fallbackFilms = [
  { id: 1, title: "City Lights & Love", category: "Engagement Film", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2940&auto=format&fit=crop" },
  { id: 2, title: "A Tuscan Dream", category: "Destination Wedding", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop" },
  { id: 3, title: "The Grand Affair", category: "Event Highlight", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2938&auto=format&fit=crop" },
];

const Films = () => {
  const [films, setFilms] = useState(fallbackFilms);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await filmsAPI.getAll();
        if (response.data && response.data.length > 0) {
          const apiFilms = response.data.map(item => ({
            id: item.id,
            title: item.title,
            category: item.category,
            img: item.thumbnail
          }));
          setFilms(apiFilms);
        }
      } catch (error) {
        console.error("Using fallback films. DB might not be connected.");
      }
    };
    fetchFilms();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-20">
      <div className="max-w-[90rem] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-display mb-6 tracking-tight">Cinematic Films</h1>
          <p className="text-white/60 max-w-2xl mx-auto uppercase tracking-widest text-sm">
            Immersive storytelling through motion.
          </p>
        </motion.div>
        
        <div className="flex flex-col gap-24">
          {films.map((film, i) => (
            <Link 
              key={film.id}
              to={`/films/${film.id}`}
              className="group relative w-full aspect-video md:aspect-[21/9] bg-surface/10 cursor-pointer overflow-hidden block"
            >
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="w-full h-full"
              >
                <img 
                  src={film.img} 
                  alt={film.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-2 border-white/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                    <Play className="ml-2 text-white group-hover:text-black transition-colors" size={32} />
                  </div>
                </div>

                <div className="absolute bottom-12 left-12 text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-accent uppercase tracking-[0.3em] text-xs mb-4">{film.category}</p>
                  <h3 className="text-4xl md:text-6xl font-display text-white tracking-wide">{film.title}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Films;
