import { useState, useEffect } from 'react';
import { AdminTable } from '../../components/ui/AdminTable';
import { Modal } from '../../components/ui/Modal';
import { testimonialsAPI } from '../../services/api';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ client_name: '', review: '' });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const res = await testimonialsAPI.getAll();
      setTestimonials(res.data);
    } catch (error) {
      console.error('Failed to fetch testimonials', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await testimonialsAPI.create(formData);
      fetchTestimonials();
      setIsModalOpen(false);
      setFormData({ client_name: '', review: '' });
    } catch (error) {
      console.error('Failed to create testimonial', error);
      alert('Failed to save testimonial. Check backend logs.');
    }
  };

  const columns = [
    { header: 'Client Name', accessor: 'client_name' },
    { header: 'Review', render: (row) => <span className="truncate max-w-xs block text-sm">{row.review?.substring(0, 80)}...</span> },
    { header: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display mb-1">Testimonials</h2>
          <p className="text-sm text-textSecondary uppercase tracking-widest">Manage client reviews</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">Add Testimonial</button>
      </div>

      {isLoading ? (
        <p className="text-textSecondary">Loading testimonials...</p>
      ) : (
        <AdminTable columns={columns} data={testimonials} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Testimonial">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Client Name</label>
            <input type="text" value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" required />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Review</label>
            <textarea rows="5" value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary resize-none" placeholder="Client's testimonial..." required />
          </div>
          <button type="submit" className="w-full btn-primary">Save Testimonial</button>
        </form>
      </Modal>
    </div>
  );
};

export default TestimonialsManager;
