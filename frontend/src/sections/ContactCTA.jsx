import { motion } from 'framer-motion';

const ContactCTA = () => {
  return (
    <section className="py-32 px-6 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-accent uppercase tracking-widest text-sm mb-6">Available Worldwide</p>
          <h2 className="text-5xl md:text-7xl font-display mb-10">Let's Create Together</h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto mb-12">
            We take on a limited number of weddings and editorial projects each year to ensure 
            every client receives our undivided attention and artistry.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Inquire Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
