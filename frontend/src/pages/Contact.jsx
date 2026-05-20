import { useState } from 'react';
import { motion } from 'framer-motion';
import { inquiriesAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await inquiriesAPI.create(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', event_type: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-[90rem] mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Information Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center"
        >
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">Let's Connect</p>
          <h1 className="text-5xl md:text-7xl font-display mb-10 tracking-tight leading-tight">
            Tell Us <br /> Your Story.
          </h1>
          <p className="text-textSecondary mb-16 text-lg leading-relaxed max-w-md">
            We accept a highly limited number of commissions each year to ensure the absolute highest level of dedication and artistry for each client.
          </p>

          <div className="space-y-10 text-sm tracking-widest uppercase">
            <div>
              <span className="text-textSecondary block mb-2 text-xs">Email Inquiries</span>
              <a href="mailto:hello@studio.com" className="hover:text-accent transition-colors">hello@studio.com</a>
            </div>
            <div>
              <span className="text-textSecondary block mb-2 text-xs">Direct Line</span>
              <a href="tel:+15551234567" className="hover:text-accent transition-colors">+91 9876543210</a>
            </div>
            <div>
              <span className="text-textSecondary block mb-2 text-xs">Studio Location</span>
              <p>Hyderabad, Telangana</p>
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-surface/50 p-8 md:p-16 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Subtle decorative border */}
          <div className="absolute inset-4 border border-textPrimary/10 pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-textPrimary/20 py-2 focus:outline-none focus:border-textPrimary transition-colors" required />
                <label htmlFor="name" className="absolute left-0 top-2 text-xs uppercase tracking-widest text-textSecondary peer-focus:-translate-y-6 peer-focus:text-textPrimary peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all">Your Name</label>
              </div>
              <div className="relative group">
                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-textPrimary/20 py-2 focus:outline-none focus:border-textPrimary transition-colors" required />
                <label htmlFor="email" className="absolute left-0 top-2 text-xs uppercase tracking-widest text-textSecondary peer-focus:-translate-y-6 peer-focus:text-textPrimary peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all">Email Address</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-textPrimary/20 py-2 focus:outline-none focus:border-textPrimary transition-colors" />
                <label htmlFor="phone" className="absolute left-0 top-2 text-xs uppercase tracking-widest text-textSecondary peer-focus:-translate-y-6 peer-focus:text-textPrimary peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all">Phone Number</label>
              </div>
              <div className="relative group">
                <select id="event_type" value={formData.event_type} onChange={handleChange} className="w-full bg-transparent border-b border-textPrimary/20 py-2 focus:outline-none focus:border-textPrimary transition-colors text-textPrimary appearance-none rounded-none text-xs uppercase tracking-widest" required>
                  <option value="" disabled className="bg-background">Event Type</option>
                  <option value="wedding" className="bg-background">Wedding</option>
                  <option value="pre-wedding" className="bg-background">Pre-Wedding</option>
                  <option value="event" className="bg-background">Event</option>
                  <option value="other" className="bg-background">Other</option>
                </select>
              </div>
            </div>

            <div className="relative group">
              <textarea id="message" rows="4" value={formData.message} onChange={handleChange} placeholder=" " className="peer w-full bg-transparent border-b border-textPrimary/20 py-2 focus:outline-none focus:border-textPrimary transition-colors resize-none" required></textarea>
              <label htmlFor="message" className="absolute left-0 top-2 text-xs uppercase tracking-widest text-textSecondary peer-focus:-translate-y-6 peer-focus:text-textPrimary peer-[:not(:placeholder-shown)]:-translate-y-6 transition-all">Details about your event...</label>
            </div>

            <button type="submit" disabled={status === 'loading'} className="w-full py-4 border border-textPrimary hover:bg-textPrimary hover:text-background transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-medium mt-8 disabled:opacity-50">
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Inquiry Sent' : status === 'error' ? 'Error. Try Again' : 'Submit Inquiry'}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full h-96 mt-32 bg-surface relative overflow-hidden"
      >
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" alt="Location" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-white uppercase tracking-widest bg-black/50 px-6 py-3 backdrop-blur-md">View on Google Maps</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
