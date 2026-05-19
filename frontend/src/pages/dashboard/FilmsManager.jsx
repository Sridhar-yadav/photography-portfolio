import { useState, useEffect } from 'react';
import { AdminTable } from '../../components/ui/AdminTable';
import { Modal } from '../../components/ui/Modal';
import { filmsAPI } from '../../services/api';

const FilmsManager = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', video_url: '' });
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      setIsLoading(true);
      const res = await filmsAPI.getAll();
      setFilms(res.data);
    } catch (error) {
      console.error('Failed to fetch films', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('video_url', formData.video_url);
    if (thumbnail) {
      data.append('thumbnail', thumbnail);
    }

    try {
      await filmsAPI.create(data);
      fetchFilms();
      setIsModalOpen(false);
      setFormData({ title: '', category: '', video_url: '' });
      setThumbnail(null);
    } catch (error) {
      console.error('Failed to create film', error);
      alert('Failed to save film. Check backend logs.');
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { header: 'Video URL', render: (row) => <a href={row.video_url} target="_blank" rel="noreferrer" className="text-accent underline text-xs">View</a> },
    { header: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display mb-1">Cinematic Films</h2>
          <p className="text-sm text-textSecondary uppercase tracking-widest">Manage your video portfolio</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">Add New Film</button>
      </div>

      {isLoading ? (
        <p className="text-textSecondary">Loading films...</p>
      ) : (
        <AdminTable columns={columns} data={films} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Film">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Film Title</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" required />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary appearance-none" required>
              <option value="">Select Category</option>
              <option value="Wedding">Wedding</option>
              <option value="Pre-Wedding">Pre-Wedding</option>
              <option value="Event">Event</option>
              <option value="Cinematic">Cinematic</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Video URL (YouTube/Vimeo)</label>
            <input type="url" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" placeholder="https://youtube.com/watch?v=..." required />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Thumbnail</label>
            <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} className="w-full text-sm text-textSecondary file:mr-4 file:py-2 file:px-4 file:border file:border-textPrimary/20 file:bg-surface/30 file:text-textPrimary file:text-xs file:uppercase file:tracking-widest" />
          </div>
          <button type="submit" className="w-full btn-primary">Save Film</button>
        </form>
      </Modal>
    </div>
  );
};

export default FilmsManager;
