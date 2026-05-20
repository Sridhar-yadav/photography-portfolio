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
  const [galleryImages, setGalleryImages] = useState([]);

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
    
    if (galleryImages.length > 0) {
      galleryImages.forEach((file) => {
        data.append('gallery_images', file);
      });
    }

    try {
      await portfolioAPI.create(data);
      fetchStories();
      setIsModalOpen(false);
      setFormData({ title: '', category: '', description: '', location: '', event_date: '' });
      setCoverImage(null);
      setGalleryImages([]);
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

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" placeholder="e.g. Lake Como, Italy" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Event Date</label>
              <input type="date" value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Description</label>
            <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary resize-none" placeholder="Details about this story..." required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Dropzone file={coverImage} setFile={setCoverImage} label="Cover Image" />
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Gallery Images</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={e => setGalleryImages(Array.from(e.target.files))} 
                className="w-full text-sm text-textSecondary file:mr-4 file:py-2 file:px-4 file:border file:border-textPrimary/20 file:bg-surface/30 file:text-textPrimary file:text-xs file:uppercase file:tracking-widest"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary">Save Story</button>
        </form>
      </Modal>
    </div>
  );
};

export default PortfolioManager;
