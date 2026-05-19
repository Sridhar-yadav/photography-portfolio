import { useState, useEffect } from 'react';
import { homepageAPI } from '../../services/api';

const HomepageCMS = () => {
  const [data, setData] = useState({ hero_text: '', tagline: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await homepageAPI.getAll();
      if (res.data.length > 0) {
        setData(res.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch homepage data', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-display mb-1">Homepage CMS</h2>
        <p className="text-sm text-textSecondary uppercase tracking-widest">Update your landing page content</p>
      </div>

      {isLoading ? (
        <p className="text-textSecondary">Loading content...</p>
      ) : (
        <div className="bg-surface/50 border border-textPrimary/10 p-8 backdrop-blur-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Hero Text</label>
              <input 
                type="text" 
                value={data.hero_text}
                onChange={(e) => setData({ ...data, hero_text: e.target.value })}
                className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary text-xl font-display" 
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Tagline</label>
              <textarea 
                rows="3"
                value={data.tagline}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary resize-none" 
              />
            </div>

            <button type="button" className="btn-primary w-full">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomepageCMS;
