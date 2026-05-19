import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { portfolioAPI, filmsAPI, inquiriesAPI, productsAPI, testimonialsAPI } from '../../services/api';

const Overview = () => {
  const [stats, setStats] = useState([
    { name: 'Total Inquiries', value: '—', color: 'text-accent' },
    { name: 'Active Portfolios', value: '—', color: 'text-accent' },
    { name: 'Films Published', value: '—', color: 'text-accent' },
    { name: 'Store Products', value: '—', color: 'text-accent' },
  ]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [portfolioRes, filmsRes, inquiriesRes, productsRes] = await Promise.allSettled([
        portfolioAPI.getAll(),
        filmsAPI.getAll(),
        inquiriesAPI.getAll(),
        productsAPI.getAll(),
      ]);

      setStats([
        { name: 'Total Inquiries', value: inquiriesRes.status === 'fulfilled' ? String(inquiriesRes.value.data.length) : '0', color: 'text-accent' },
        { name: 'Active Portfolios', value: portfolioRes.status === 'fulfilled' ? String(portfolioRes.value.data.length) : '0', color: 'text-accent' },
        { name: 'Films Published', value: filmsRes.status === 'fulfilled' ? String(filmsRes.value.data.length) : '0', color: 'text-accent' },
        { name: 'Store Products', value: productsRes.status === 'fulfilled' ? String(productsRes.value.data.length) : '0', color: 'text-accent' },
      ]);

      if (inquiriesRes.status === 'fulfilled') {
        setRecentInquiries(inquiriesRes.value.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to load dashboard data', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-display mb-8">Welcome back.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface/50 p-6 border border-textPrimary/10 backdrop-blur-sm"
            >
              <p className="text-textSecondary uppercase tracking-widest text-xs mb-2">{stat.name}</p>
              <p className={`text-4xl font-display ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <div className="bg-surface/50 border border-textPrimary/10 p-6">
            <h3 className="uppercase tracking-widest text-sm mb-6 pb-4 border-b border-textPrimary/10">Recent Inquiries</h3>
            <div className="space-y-4">
              {recentInquiries.length === 0 ? (
                <p className="text-sm text-textSecondary">No inquiries yet.</p>
              ) : (
                recentInquiries.map((inq) => (
                  <div key={inq.id} className="flex items-center justify-between py-2 border-b border-textPrimary/5 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{inq.name}</p>
                      <p className="text-xs text-textSecondary">{inq.event_type}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs uppercase tracking-widest ${
                      inq.status === 'New' ? 'bg-accent/20 text-accent' 
                      : inq.status === 'Contacted' ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-surface text-textSecondary'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface/50 border border-textPrimary/10 p-6">
            <h3 className="uppercase tracking-widest text-sm mb-6 pb-4 border-b border-textPrimary/10">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/dashboard/portfolio')}
                className="p-4 border border-textPrimary/20 hover:border-textPrimary text-sm uppercase tracking-widest transition-colors text-left"
              >
                + New Story
              </button>
              <button 
                onClick={() => navigate('/dashboard/films')}
                className="p-4 border border-textPrimary/20 hover:border-textPrimary text-sm uppercase tracking-widest transition-colors text-left"
              >
                + New Film
              </button>
              <button 
                onClick={() => navigate('/dashboard/products')}
                className="p-4 border border-textPrimary/20 hover:border-textPrimary text-sm uppercase tracking-widest transition-colors text-left"
              >
                + New Product
              </button>
              <button 
                onClick={() => navigate('/dashboard/inquiries')}
                className="p-4 border border-textPrimary/20 hover:border-textPrimary text-sm uppercase tracking-widest transition-colors text-left"
              >
                View Inquiries
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
