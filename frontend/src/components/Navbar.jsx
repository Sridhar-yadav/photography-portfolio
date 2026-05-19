import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-semibold tracking-widest uppercase">
          Studio.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest uppercase">
          <Link to="/stories" className="hover:text-accent transition-colors">Stories</Link>
          <Link to="/films" className="hover:text-accent transition-colors">Films</Link>
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          <Link to="/store" className="hover:text-accent transition-colors">Store</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
          <button onClick={toggleTheme} className="p-2 hover:bg-surface rounded-full transition-colors">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-surface p-6 flex flex-col space-y-4 shadow-xl">
          <Link to="/stories" className="text-lg tracking-widest uppercase" onClick={() => setIsOpen(false)}>Stories</Link>
          <Link to="/films" className="text-lg tracking-widest uppercase" onClick={() => setIsOpen(false)}>Films</Link>
          <Link to="/about" className="text-lg tracking-widest uppercase" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/store" className="text-lg tracking-widest uppercase" onClick={() => setIsOpen(false)}>Store</Link>
          <Link to="/contact" className="text-lg tracking-widest uppercase" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
