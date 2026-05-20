import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { filmsAPI } from '../services/api';

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setIsLoading(true);
        const res = await filmsAPI.getById(id);
        setFilm(res.data);
      } catch (error) {
        console.error('Failed to fetch film detail', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilm();
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // YouTube Regex matches: youtube.com/watch?v=XXXX, youtube.com/embed/XXXX, youtu.be/XXXX
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    }
    
    // Vimeo Regex matches: vimeo.com/XXXX
    const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    return url;
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white pt-32 pb-20 px-6 flex items-center justify-center">
        <p className="text-white/60 uppercase tracking-widest text-xs">Loading film details...</p>
      </div>
    );
  }

  if (!film) {
    return (
      <div className="bg-black min-h-screen text-white pt-32 pb-20 px-6 flex items-center justify-center">
        <p className="text-white/60 uppercase tracking-widest text-xs">Film not found.</p>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(film.video_url);

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-20 px-6">
      <div className="max-w-[90rem] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <p className="text-accent uppercase tracking-widest text-sm mb-4">{film.category}</p>
          <h1 className="text-5xl md:text-7xl font-display mb-8">{film.title}</h1>
        </motion.div>

        {/* Video Player */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full aspect-video bg-surface/10 relative overflow-hidden mb-16 border border-white/10"
        >
          {isPlaying && embedUrl ? (
            <iframe 
              src={embedUrl}
              title={film.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img 
                src={film.thumbnail || 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop'} 
                alt={film.title} 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-24 h-24 rounded-full border-2 border-white/30 backdrop-blur-md flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-500 group"
                >
                  <span className="ml-2 text-white group-hover:text-black transition-colors text-2xl">▶</span>
                </button>
              </div>
            </>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-white/70 text-lg leading-relaxed mb-12">
            Experience our immersive storytelling through motion. This cinematic piece represents our core philosophy of capturing emotional and authentic stories.
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
