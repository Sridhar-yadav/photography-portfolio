import { motion } from 'framer-motion';

const products = [
  { id: 1, title: "Fine Art Heirloom Album", price: "from $1,200", img: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2868&auto=format&fit=crop" },
  { id: 2, title: "Gallery Standard Frames", price: "from $450", img: "https://images.unsplash.com/photo-1582560469766-88dce5b7d6b4?q=80&w=2836&auto=format&fit=crop" },
  { id: 3, title: "Archival Prints Box", price: "from $300", img: "https://images.unsplash.com/photo-1605371924599-2d0365da26f5?q=80&w=2940&auto=format&fit=crop" },
];

const Store = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-display mb-6 tracking-tight">The Print Shop</h1>
        <p className="text-textSecondary max-w-2xl mx-auto uppercase tracking-widest text-sm">
          Preserve your memories in museum-quality physical formats.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {products.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/5] bg-surface overflow-hidden mb-6 relative">
              <img 
                src={product.img} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white uppercase tracking-widest text-xs border border-white px-6 py-3 backdrop-blur-sm">View Details</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-display mb-2">{product.title}</h3>
              <p className="text-textSecondary text-sm tracking-widest">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Store;
