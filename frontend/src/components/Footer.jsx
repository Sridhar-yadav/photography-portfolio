import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface py-16 mt-20 border-t border-textPrimary/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-display font-semibold mb-4 uppercase tracking-widest">Studio.</h3>
          <p className="text-textSecondary text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
            Crafting cinematic luxury stories for the modern romantics. 
            Available worldwide.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase mb-6 text-accent">Quick Links</h4>
          <ul className="space-y-3 text-sm text-textSecondary">
            <li><Link to="/stories" className="hover:text-textPrimary transition-colors">Portfolio</Link></li>
            <li><Link to="/films" className="hover:text-textPrimary transition-colors">Films</Link></li>
            <li><Link to="/contact" className="hover:text-textPrimary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase mb-6 text-accent">Socials</h4>
          <ul className="space-y-3 text-sm text-textSecondary">
            <li><a href="#" className="hover:text-textPrimary transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-textPrimary transition-colors">Vimeo</a></li>
            <li><a href="#" className="hover:text-textPrimary transition-colors">Pinterest</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-textPrimary/10 flex flex-col md:flex-row justify-between items-center text-xs text-textSecondary">
        <p>&copy; {new Date().getFullYear()} Studio. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed with precision.</p>
      </div>
    </footer>
  );
};

export default Footer;
