import { useState, useEffect } from 'react';
import { AdminTable } from '../../components/ui/AdminTable';
import { Modal } from '../../components/ui/Modal';
import { inquiriesAPI } from '../../services/api';
import { Phone, Mail, MessageSquare, X } from 'lucide-react';

const InquiryCRM = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const res = await inquiriesAPI.getAll();
      setInquiries(res.data);
    } catch (error) {
      console.error('Failed to fetch inquiries', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await inquiriesAPI.updateStatus(id, newStatus);
      fetchInquiries();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Event', accessor: 'event_type' },
    { header: 'Email', render: (row) => (
      <a href={`mailto:${row.email}`} className="text-accent hover:underline text-sm">{row.email}</a>
    )},
    { header: 'Phone', render: (row) => (
      <a href={`tel:${row.phone}`} className="text-accent hover:underline text-sm">{row.phone}</a>
    )},
    { header: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
    { header: 'Status', render: (row) => (
      <select 
        value={row.status} 
        onChange={(e) => handleStatusChange(row.id, e.target.value)}
        className={`px-2 py-1 text-xs uppercase tracking-widest border-0 appearance-none cursor-pointer focus:outline-none ${
          row.status === 'New' ? 'bg-accent/20 text-accent' 
          : row.status === 'Contacted' ? 'bg-blue-500/20 text-blue-400' 
          : row.status === 'Converted' ? 'bg-green-500/20 text-green-400' 
          : 'bg-surface text-textSecondary'
        }`}
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Converted">Converted</option>
        <option value="Closed">Closed</option>
      </select>
    )},
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display mb-1">Inquiry CRM</h2>
          <p className="text-sm text-textSecondary uppercase tracking-widest">Manage your potential leads</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-textSecondary">Loading inquiries...</p>
      ) : (
        <AdminTable 
          columns={columns} 
          data={inquiries} 
          onEdit={(row) => setSelectedInquiry(row)}
        />
      )}

      {/* Inquiry Detail / Contact Modal */}
      <Modal isOpen={!!selectedInquiry} onClose={() => setSelectedInquiry(null)} title="Inquiry Details">
        {selectedInquiry && (
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-surface/30 border border-textPrimary/10 p-6">
              <h3 className="font-display text-xl mb-1">{selectedInquiry.name}</h3>
              <p className="text-textSecondary text-sm uppercase tracking-widest">{selectedInquiry.event_type}</p>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-3 gap-4">
              <a 
                href={`tel:${selectedInquiry.phone}`}
                className="flex flex-col items-center gap-2 p-4 border border-textPrimary/20 hover:border-accent hover:bg-accent/5 transition-colors text-center"
              >
                <Phone size={20} className="text-accent" />
                <span className="text-xs uppercase tracking-widest">Call</span>
                <span className="text-xs text-textSecondary">{selectedInquiry.phone}</span>
              </a>
              <a 
                href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.event_type} Inquiry&body=Hi ${selectedInquiry.name},%0D%0A%0D%0AThank you for reaching out to us regarding your ${selectedInquiry.event_type}. We would love to discuss this further.%0D%0A%0D%0ABest regards,%0D%0AStudio Team`}
                className="flex flex-col items-center gap-2 p-4 border border-textPrimary/20 hover:border-accent hover:bg-accent/5 transition-colors text-center"
              >
                <Mail size={20} className="text-accent" />
                <span className="text-xs uppercase tracking-widest">Email</span>
                <span className="text-xs text-textSecondary truncate w-full">{selectedInquiry.email}</span>
              </a>
              <a 
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hi ${selectedInquiry.name}, thank you for your inquiry about ${selectedInquiry.event_type}. We'd love to discuss details with you!`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 p-4 border border-textPrimary/20 hover:border-green-500 hover:bg-green-500/5 transition-colors text-center"
              >
                <MessageSquare size={20} className="text-green-500" />
                <span className="text-xs uppercase tracking-widest">WhatsApp</span>
                <span className="text-xs text-textSecondary">Message</span>
              </a>
            </div>

            {/* Client Message */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Client's Message</label>
              <div className="bg-surface/30 border border-textPrimary/10 p-4 text-sm leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Update */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Update Status</label>
              <div className="grid grid-cols-4 gap-2">
                {['New', 'Contacted', 'Converted', 'Closed'].map((status) => (
                  <button 
                    key={status}
                    onClick={() => handleStatusChange(selectedInquiry.id, status)}
                    className={`py-2 text-xs uppercase tracking-widest border transition-colors ${
                      selectedInquiry.status === status 
                        ? 'bg-textPrimary text-background border-textPrimary' 
                        : 'border-textPrimary/20 hover:border-textPrimary'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex justify-between text-xs text-textSecondary uppercase tracking-widest pt-4 border-t border-textPrimary/10">
              <span>Received: {new Date(selectedInquiry.created_at).toLocaleDateString()}</span>
              <span>ID: #{selectedInquiry.id}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InquiryCRM;
