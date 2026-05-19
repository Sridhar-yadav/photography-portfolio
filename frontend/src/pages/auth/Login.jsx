import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { authAPI } from '../../services/api';
import { setCredentials } from '../../redux/slices/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await authAPI.login({ username, password });
      dispatch(setCredentials({ access: response.data.access }));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display mb-2">Studio Admin</h1>
          <p className="text-textSecondary uppercase tracking-widest text-xs">Secure Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="bg-surface/50 p-8 backdrop-blur-sm border border-textPrimary/10">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="relative group">
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" " 
                className="peer w-full bg-transparent border-b border-textPrimary/20 py-2 focus:outline-none focus:border-textPrimary transition-colors" 
                required 
              />
              <label htmlFor="username" className="absolute left-0 top-2 text-xs uppercase tracking-widest text-textSecondary peer-focus:-translate-y-6 peer-focus:text-textPrimary peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all">Username</label>
            </div>

            <div className="relative group">
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" " 
                className="peer w-full bg-transparent border-b border-textPrimary/20 py-2 focus:outline-none focus:border-textPrimary transition-colors" 
                required 
              />
              <label htmlFor="password" className="absolute left-0 top-2 text-xs uppercase tracking-widest text-textSecondary peer-focus:-translate-y-6 peer-focus:text-textPrimary peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all">Password</label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-textPrimary text-background transition-all duration-300 uppercase tracking-[0.2em] text-xs font-medium mt-10 hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
