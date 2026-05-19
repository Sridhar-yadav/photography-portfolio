import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../../services/api';
import { AdminTable } from '../../components/ui/AdminTable';
import { Modal } from '../../components/ui/Modal';
import { Dropzone } from '../../components/ui/Dropzone';

const PortfolioManager = () => {
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({ title: '', category: '', description: '', location: '', event_date: '' });
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      const res = await portfolioAPI.getAll();
      setStories(res.data);
    } catch (error) {
      console.error('Failed to fetch stories', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use FormData for file uploads
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('event_date', formData.event_date);
    if (coverImage) {
      data.append('cover_image', coverImage);
    }

    try {
      // For Phase 2 MVP, just assuming create. Update logic can be added later.
      await portfolioAPI.create(data);
      fetchStories();
      setIsModalOpen(false);
      setFormData({ title: '', category: '', description: '', location: '', event_date: '' });
      setCoverImage(null);
    } catch (error) {
      console.error('Failed to save story', error);
      alert('Failed to save story. Please check your Cloudinary keys and backend logs.');
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { header: 'Location', accessor: 'location' },
    { header: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display mb-1">Portfolio Stories</h2>
          <p className="text-sm text-textSecondary uppercase tracking-widest">Manage your cinematic galleries</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          Add New Story
        </button>
      </div>

      {isLoading ? (
        <p className="text-textSecondary">Loading stories...</p>
      ) : (
        <AdminTable 
          columns={columns} 
          data={stories} 
          onEdit={() => alert('Edit feature coming in full release')}
          onDelete={() => alert('Delete feature coming in full release')}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Story">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" required />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary appearance-none" required>
                <option value="">Select Category</option>
                <option value="Weddings">Weddings</option>
                <option value="Pre-Weddings">Pre-Weddings</option>
                <option value="Maternity">Maternity</option>
              </select>
            </div>
          </div>
          
          <Dropzone file={coverImage} setFile={setCoverImage} label="Cover Image" />

          <button type="submit" className="w-full btn-primary">Save Story</button>
        </form>
      </Modal>
    </div>
  );
};

export default PortfolioManager;
